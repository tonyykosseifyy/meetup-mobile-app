"use strict";

/* eslint-disable react-native/no-inline-styles */
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import { colors } from "../colors.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PickerItemFlatlist = ({
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
  const renderItemSeparator = () => SubSeparator || /*#__PURE__*/_jsx(View, {
    style: {
      height: 5
    }
  });
  if (disabled) {
    return /*#__PURE__*/_jsx(View, {
      style: [{
        backgroundColor: colors.grey3,
        padding: 5
      }, disabledButtonStyle],
      children: /*#__PURE__*/_jsx(Text, {
        style: [{
          color: colors.grey2
        }, disabledTitleStyle],
        children: data.name
      })
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsxs(TouchableOpacity, {
      style: [{
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }, titleButtonStyle, {
        backgroundColor: isOpen ? selectedBtnColor || colors.grey1 : btnColor || colors.white
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
      children: [/*#__PURE__*/_jsx(Text, {
        ...titleProps,
        style: [{
          fontSize: 14,
          fontWeight: '600'
        }, titleStyle],
        children: data.name
      }), data?.extraData?.length && (TitleIcon || (isOpen ? /*#__PURE__*/_jsx(Image, {
        source: require('../imgs/chevron-up.png'),
        resizeMode: "contain",
        style: {
          width: 20,
          height: 20
        }
      }) : /*#__PURE__*/_jsx(Image, {
        source: require('../imgs/chevron-down.png'),
        resizeMode: "contain",
        style: {
          width: 20,
          height: 20
        }
      })))]
    }), isOpen && data?.extraData?.length && /*#__PURE__*/_jsx(View, {
      style: [{
        paddingTop: 5,
        paddingHorizontal: 10
      }, subViewStyle],
      children: extraDataType === 'string' ? /*#__PURE__*/_jsx(FlatList, {
        data: extraData,
        keyExtractor: item => item,
        renderItem: ({
          item
        }) => {
          const selectedValue = selectedData?.value;
          const isSelected = selectedData?.id === data.id && selectedValue === item;
          return /*#__PURE__*/_jsxs(TouchableOpacity, {
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
            children: [isSelected && checkedIconPosition === 'left' && (SubCheckedIcon || /*#__PURE__*/_jsx(Image, {
              source: require('../imgs/check.png'),
              resizeMode: "contain",
              style: {
                width: 10,
                height: 10,
                marginRight: 5
              }
            })), /*#__PURE__*/_jsx(Text, {
              ...subTitleProps,
              style: [{
                fontSize: 13
              }, subTitleStyle, selectedSubTitleStyle && isSelected ? selectedSubTitleStyle : {}],
              children: item
            }), isSelected && checkedIconPosition === 'right' && (SubCheckedIcon || /*#__PURE__*/_jsx(Image, {
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
      }) : /*#__PURE__*/_jsx(FlatList, {
        data: openItem?.extraData,
        renderItem: ({
          item
        }) => {
          const selectedValue = selectedData?.value;
          const isSelected = selectedValue?.id === item.id;
          return /*#__PURE__*/_jsxs(TouchableOpacity, {
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
            children: [isSelected && checkedIconPosition === 'left' && (SubCheckedIcon || /*#__PURE__*/_jsx(Image, {
              source: require('../imgs/check.png'),
              resizeMode: "contain",
              style: {
                width: 10,
                height: 10,
                marginRight: 5
              }
            })), /*#__PURE__*/_jsx(Text, {
              style: [{
                fontSize: 13
              }, subTitleStyle, selectedSubTitleStyle && isSelected ? selectedSubTitleStyle : {}],
              children: item.name
            }), isSelected && checkedIconPosition === 'right' && (SubCheckedIcon || /*#__PURE__*/_jsx(Image, {
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
//# sourceMappingURL=PickerItemFlatlist.js.map