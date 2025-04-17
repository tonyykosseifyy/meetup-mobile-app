"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownFlatlist = void 0;
var _reactNative = require("react-native");
var _colors = require("../colors.js");
var _react = require("react");
var _PickerItemFlatlist = require("./PickerItemFlatlist.js");
var _jsxRuntime = require("react/jsx-runtime");
const DropDownFlatlist = ({
  data,
  onSelect,
  selectedBtnColor,
  selectedSubBtnColor,
  btnColor,
  subBtnColor,
  selectedData,
  onSelectTitle,
  titleStyle,
  titleButtonStyle,
  disabledButtonStyle,
  disabledTitleStyle,
  subButtonStyle,
  subTitleStyle,
  SubCheckedIcon,
  EmptyListView,
  dropDownContainerStyle,
  showsVerticalScrollIndicator,
  subViewStyle,
  TitleIcon,
  titleProps,
  subTitleProps,
  checkedIconPosition,
  onEndReached,
  parentY,
  hasLabel,
  SubSeparator,
  selectedSubBtnStyle,
  selectedSubTitleStyle
}) => {
  const [openItem, setOpenItem] = (0, _react.useState)(null);
  const [containerHeight, setContainerHeight] = (0, _react.useState)(0);
  const scrollRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    if (selectedData) {
      const selected = {
        ...selectedData
      };
      delete selected.value;
      setOpenItem(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(() => {
    if (openItem && scrollRef.current && data) {
      const index = data?.findIndex(d => d.id === openItem.id);
      if (index !== -1) {
        scrollRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5
        });
      }
    }
  }, [scrollRef, openItem, data]);
  const renderItem = ({
    item
  }) => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickerItemFlatlist.PickerItemFlatlist, {
      item: item,
      openItem: openItem,
      setOpenItem: p => {
        setOpenItem(p);
        onSelectTitle && onSelectTitle(item);
      },
      selectedBtnColor: selectedBtnColor,
      btnColor: btnColor,
      selectedData: selectedData,
      onSelect: onSelect,
      titleStyle: titleStyle,
      titleButtonStyle: titleButtonStyle,
      disabledButtonStyle: disabledButtonStyle,
      disabledTitleStyle: disabledTitleStyle,
      disabled: item.disabled,
      selectedSubBtnColor: selectedSubBtnColor,
      subBtnColor: subBtnColor,
      subButtonStyle: subButtonStyle,
      subTitleStyle: subTitleStyle,
      selectedSubTitleStyle: selectedSubTitleStyle,
      SubCheckedIcon: SubCheckedIcon,
      subViewStyle: subViewStyle,
      TitleIcon: TitleIcon,
      titleProps: titleProps,
      subTitleProps: subTitleProps,
      checkedIconPosition: checkedIconPosition,
      SubSeparator: SubSeparator,
      selectedSubBtnStyle: selectedSubBtnStyle
    });
  };
  const top = parentY + containerHeight + 100 >= _reactNative.Dimensions.get('window').height;
  const opacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.timing(opacity, {
      toValue: 1,
      easing: _reactNative.Easing.linear,
      duration: 250,
      useNativeDriver: true
    }).start();
  }, [opacity]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      onLayout: e => {
        setContainerHeight(e.nativeEvent.layout.height);
      },
      style: [style.card, style.shadowProp, style.dropDownContainer, dropDownContainerStyle,
      // eslint-disable-next-line react-native/no-inline-styles
      top ? {
        bottom: hasLabel ? 70 : 50
      } : {
        top: 0
      }, {
        opacity
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
        data: data,
        renderItem: renderItem,
        showsVerticalScrollIndicator: showsVerticalScrollIndicator,
        nestedScrollEnabled: true,
        ListEmptyComponent: EmptyListView || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: style.noDataView,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            children: "No data available"
          })
        }),
        ref: scrollRef,
        getItemLayout: (_, index) => ({
          length: 25,
          offset: 30 * index,
          index
        }),
        onEndReached: onEndReached
      })
    })
  });
};
exports.DropDownFlatlist = DropDownFlatlist;
const style = _reactNative.StyleSheet.create({
  dropDownContainer: {
    width: '100%',
    minWidth: 200,
    alignSelf: 'center',
    position: _reactNative.Platform.OS === 'ios' ? 'absolute' : 'relative',
    backgroundColor: _colors.colors.white,
    borderRadius: 16,
    paddingTop: 5,
    paddingBottom: 8,
    maxHeight: 200,
    paddingHorizontal: 10,
    zIndex: 10
  },
  dropDownLabels: {
    paddingVertical: 8
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 25,
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.04,
    shadowRadius: 6
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.04,
    shadowRadius: 6
  },
  noDataView: {
    padding: 10,
    alignItems: 'center'
  }
});
//# sourceMappingURL=DropDownFlatlist.js.map