/* eslint-disable */
'use strict'

import React, { Component, PropTypes } from 'react'

import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  StyleSheet
} from 'react-native'

import StaticRenderer from 'react-native/Libraries/Components/StaticRenderer'
import TimerMixin from 'react-timer-mixin'

const deviceWidth = Dimensions.get('window').width;

type DataGetter = (pageIndex: number) => any
class DataSource {
  _getPageData: (pageIndex: number) => any;

  constructor (getter: DataGetter) {
    this._getPageData = getter
  }

  getPageData (pageIndex: number): any {
    return this._getPageData(pageIndex)
  }
}

const ViewPager = React.createClass({
  mixins: [ TimerMixin ],

  statics: {
    DataSource: DataSource,
  },

  propTypes: {
    ...View.propTypes,
    dataSource: PropTypes.instanceOf(DataSource).isRequired,
    renderPage: PropTypes.func.isRequired,
    onChangePage: PropTypes.func,
    renderPageIndicator: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    isLoop: PropTypes.bool,
    locked: PropTypes.bool,
    autoPlay: PropTypes.bool,
    animation: PropTypes.func,
    initialPage: PropTypes.number,
  },

  fling: false,

  getDefaultProps() {
    return {
      isLoop: false,
      locked: false,
      animation: function(animate, toValue, gs) {
        return Animated.spring(animate,
          {
            toValue: toValue,
            friction: 10,
            tension: 50,
          })
      },
    }
  },

  getInitialState() {
    return {
      currentPage: 0,
      viewWidth: 0,
      scrollValue: new Animated.Value(0)
    };
  },

  componentWillMount() {
    this.childIndex = 0;

    var release = (e, gestureState) => {
      var relativeGestureDistance = gestureState.dx / deviceWidth,
          //lastPageIndex = this.props.children.length - 1,
          vx = gestureState.vx;

      var step = 0;
      if (relativeGestureDistance < -0.5 || (relativeGestureDistance < 0 && vx <= -1e-6)) {
        step = 1;
      } else if (relativeGestureDistance > 0.5 || (relativeGestureDistance > 0 && vx >= 1e-6)) {
        step = -1;
      }

      this.props.hasTouch && this.props.hasTouch(false);

      this.movePage(step, gestureState);
    }

    this._panResponder = PanResponder.create({
      // Claim responder if it's a horizontal pan
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          if (/* (gestureState.moveX <= this.props.edgeHitWidth ||
              gestureState.moveX >= deviceWidth - this.props.edgeHitWidth) && */
                this.props.locked !== true && !this.fling) {
            this.props.hasTouch && this.props.hasTouch(true);
            return true;
          }
        }
      },

      // Touch is released, scroll to the one that you're closest to
      onPanResponderRelease: release,
      onPanResponderTerminate: release,

      // Dragging, move the view with the touch
      onPanResponderMove: (e, gestureState) => {
        var dx = gestureState.dx;
        var offsetX = -dx / this.state.viewWidth + this.childIndex;
        this.state.scrollValue.setValue(offsetX);
      },
    });

    if (this.props.isLoop) {
      this.childIndex = 1;
      this.state.scrollValue.setValue(1);
    }
    if(this.props.initialPage){
      var initialPage = Number(this.props.initialPage);
      this.goToPage(initialPage, false);
    }
  },

  componentDidMount() {
    if (this.props.autoPlay) {
      this._startAutoPlay();
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoPlay) {
      this._startAutoPlay();
    } else {
      if (this._autoPlayer) {
        this.clearInterval(this._autoPlayer);
        this._autoPlayer = null;
      }
    }

    if (nextProps.dataSource) {
      // No page constraints
      /* var maxPage = nextProps.dataSource.getPageCount() - 1;
      var constrainedPage = Math.max(0, Math.min(this.state.currentPage, maxPage));
      this.setState({
        currentPage: constrainedPage,
      }); */

      // No constraints => no looping
      /* if (!nextProps.isLoop) {
        this.state.scrollValue.setValue(constrainedPage > 0 ? 1 : 0);
      } */

      // this.childIndex = Math.min(this.childIndex, constrainedPage);
      this.childIndex = Math.min(this.childIndex, this.state.currentPage);
      this.fling = false;
    }

  },

  _startAutoPlay() {
    if (!this._autoPlayer) {
      this._autoPlayer = this.setInterval(
        () => {this.movePage(1);},
        5000
      );
    }
  },

  goToPage(pageNumber, animate = true) {
    // No constraints
    /* var pageCount = this.props.dataSource.getPageCount();
    if (pageNumber < 0 || pageNumber >= pageCount) {
      console.error('Invalid page number: ', pageNumber);
      return
    } */

    var step = pageNumber - this.state.currentPage;
    this.movePage(step, null, animate);
  },

  movePage(step, gs, animate = true) {
    // No constraints
    // var pageCount = this.props.dataSource.getPageCount();
    var pageNumber = this.state.currentPage + step;
    // No constraints/looping
    /* if (this.props.isLoop) {
      pageNumber = (pageNumber + pageCount) % pageCount;
    } else {
      pageNumber = Math.min(Math.max(0, pageNumber), pageCount - 1);
    } */

    const moved = pageNumber !== this.state.currentPage;
    const scrollStep = (moved ? step : 0) + this.childIndex;
    const nextChildIdx = 1
    // const nextChildIdx = (pageNumber > 0 || this.props.isLoop) ? 1 : 0;

    const postChange = () => {
      this.fling = false;
      this.childIndex = nextChildIdx;
      this.state.scrollValue.setValue(nextChildIdx);
      this.setState({
        currentPage: pageNumber,
      });
    };

    if (animate) {
      this.fling = true;
      this.props.animation(this.state.scrollValue, scrollStep, gs)
        .start((event) => {
          if (event.finished) {
            postChange();
          }
          moved && this.props.onChangePage && this.props.onChangePage(pageNumber);
        });
    } else {
      postChange();
      moved && this.props.onChangePage && this.props.onChangePage(pageNumber);
    }
  },

  getCurrentPage() {
    return this.state.currentPage;
  },

  _getPage(pageIdx: number, loop: boolean = false) {
    var dataSource = this.props.dataSource;
    console.log(pageIdx, '=>', dataSource.getPageData(pageIdx))
    return (
      <StaticRenderer
        key={'p_' + pageIdx}
        shouldUpdate={true}
        render={this.props.renderPage.bind(
          null,
          dataSource.getPageData(pageIdx),
          pageIdx,
          this.state.currentPage
        )}
      />
    );
  },

  render() {
    var dataSource = this.props.dataSource;
    // var pageIDs = dataSource.pageIdentities;

    var bodyComponents = [];

    var pagesNum = 0;
    var hasLeft = false;
    var viewWidth = this.state.viewWidth;

    if(viewWidth > 0) {
      // left page
      bodyComponents.push(this._getPage(this.state.currentPage - 1));
      pagesNum++;
      hasLeft = true;

      // center page
      bodyComponents.push(this._getPage(this.state.currentPage));
      pagesNum++;

      // right page
      bodyComponents.push(this._getPage(this.state.currentPage + 1));
      pagesNum++;
    }

    var sceneContainerStyle = {
      width: viewWidth * pagesNum,
      flex: 1,
      flexDirection: 'row'
    };

    // this.childIndex = hasLeft ? 1 : 0;
    // this.state.scrollValue.setValue(this.childIndex);
    var translateX = this.state.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, -viewWidth]
    });

    return (
      <View style={{flex: 1}}
        onLayout={(event) => {
            // console.log('ViewPager.onLayout()');
            var viewWidth = event.nativeEvent.layout.width;
            if (!viewWidth || this.state.viewWidth === viewWidth) {
              return;
            }
            this.setState({
              currentPage: this.state.currentPage,
              viewWidth: viewWidth,
            });
          }}
        >

        <Animated.View style={[sceneContainerStyle, {transform: [{translateX}]}]}
          {...this._panResponder.panHandlers}>
          {bodyComponents}
        </Animated.View>

        {/* {this.renderPageIndicator({goToPage: this.goToPage,
                            pageCount: pageIDs.length,
                            activePage: this.state.currentPage,
                            scrollValue: this.state.scrollValue,
                            scrollOffset: this.childIndex,
                          })} */}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  indicators: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});

export { ViewPager as default, DataSource }

/* eslint-enable */
