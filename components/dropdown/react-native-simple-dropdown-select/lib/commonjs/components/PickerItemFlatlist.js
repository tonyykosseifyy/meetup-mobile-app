"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerItemFlatlist = void 0;
var _reactNative = require("react-native");
var _colors = require("../colors.js");
var _jsxRuntime = require("react/jsx-runtime");
/* eslint-disable react-native/no-inline-styles */

const PickerItemFlatlist = ({
  item: data,
  openItem,
  setOpenItem,
  selectedBtnColor,
  btnColor,
  selectedData,
  onSelect,
  titleStyle,
  titleButtonStyle,
  subButtonStyle,
  subTitleStyle,
  disabled,
  disabledButtonStyle,
  disabledTitleStyle,
  selectedSubBtnColor,
  subBtnColor,
  SubCheckedIcon,
  TitleIcon,
  subViewStyle,
  selectedSubTitleStyle,
  selectedSubBtnStyle,
  titleProps,
  subTitleProps,
  checkedIconPosition = 'left',
  SubSeparator
}) => {
  const isOpen = openItem?.id === data?.id;
  const extraData = openItem?.extraData;
  const extraDataType = typeof extraData?.[0];
  const renderItemSeparator = () => SubSeparator || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: {
      height: 5
    }
  });
  if (disabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [{
        backgroundColor: _colors.colors.grey3,
        padding: 5
      }, disabledButtonStyle],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [{
          color: _colors.colors.grey2
        }, disabledTitleStyle],
        children: data.name
      })
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
      style: [{
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }, titleButtonStyle, {
        backgroundColor: isOpen ? selectedBtnColor || _colors.colors.grey1 : btnColor || _colors.colors.white
      }],
      onPress: () => {
        if (data?.extraData?.length) {
          setOpenItem(isOpen ? null : data);
        } else {
          onSelect({
            ...data,
            value: data.name
          });
        }
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        ...titleProps,
        style: [{
          fontSize: 14,
          fontWeight: '600'
        }, titleStyle],
        children: data.name
      }), data?.extraData?.length && (TitleIcon || (isOpen ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
        source: require('../imgs/chevron-up.png'),
        resizeMode: "contain",
        style: {
          width: 20,
          height: 20
        }
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
        source: require('../imgs/chevron-down.png'),
        resizeMode: "contain",
        style: {
          width: 20,
          height: 20
        }
      })))]
    }), isOpen && data?.extraData?.length && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [{
        paddingTop: 5,
        paddingHorizontal: 10
      }, subViewStyle],
      children: extraDataType === 'string' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
        data: extraData,
        keyExtractor: item => item,
        renderItem: ({
          item
        }) => {
          const selectedValue = selectedData?.value;
          const isSelected = selectedData?.id === data.id && selectedValue === item;
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            onPress: () => {
              onSelect({
                ...data,
                value: item
              });
              setOpenItem(null);
            },
            style: [{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
            }, subButtonStyle, {
              backgroundColor: isSelected ? selectedSubBtnColor || 'transparent' : subBtnColor || 'transparent'
            }, selectedSubBtnStyle && isSelected ? selectedSubBtnStyle : {}],
            children: [isSelected && checkedIconPosition === 'left' && (SubCheckedIcon || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: require('../imgs/check.png'),
              resizeMode: "contain",
              style: {
                width: 10,
                height: 10,
                marginRight: 5
              }
            })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              ...subTitleProps,
              style: [{
                fontSize: 13
              }, subTitleStyle, selectedSubTitleStyle && isSelected ? selectedSubTitleStyle : {}],
              children: item
            }), isSelected && checkedIconPosition === 'right' && (SubCheckedIcon || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: require('../imgs/check.png'),
              resizeMode: "contain",
              style: {
                width: 10,
                height: 10,
                marginLeft: 5
              }
            }))]
          });
        },
        showsVerticalScrollIndicator: false,
        ItemSeparatorComponent: renderItemSeparator
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
        data: openItem?.extraData,
        renderItem: ({
          item
        }) => {
          const selectedValue = selectedData?.value;
          const isSelected = selectedValue?.id === item.id;
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            onPress: () => {
              onSelect({
                ...data,
                value: item
              });
              setOpenItem(null);
            },
            style: [{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
            }, subButtonStyle, {
              backgroundColor: isSelected ? selectedSubBtnColor || 'transparent' : subBtnColor || 'transparent'
            }, selectedSubBtnStyle && isSelected ? selectedSubBtnStyle : {}],
            children: [isSelected && checkedIconPosition === 'left' && (SubCheckedIcon || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: require('../imgs/check.png'),
              resizeMode: "contain",
              style: {
                width: 10,
                height: 10,
                marginRight: 5
              }
            })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [{
                fontSize: 13
              }, subTitleStyle, selectedSubTitleStyle && isSelected ? selectedSubTitleStyle : {}],
              children: item.name
            }), isSelected && checkedIconPosition === 'right' && (SubCheckedIcon || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: require('../imgs/check.png'),
              resizeMode: "contain",
              style: {
                width: 10,
                height: 10,
                marginRight: 5
              }
            }))]
          });
        },
        showsVerticalScrollIndicator: false,
        ItemSeparatorComponent: renderItemSeparator
      })
    })]
  });
};
exports.PickerItemFlatlist = PickerItemFlatlist;
//# sourceMappingURL=PickerItemFlatlist.js.map