"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _DropDownFlatlist = require("./DropDownFlatlist.js");
var _colors = require("../colors.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-native/no-inline-styles */

const DropDownSelect = props => {
  const [query, setQuery] = _react.default.useState('');
  const [open, setOpen] = _react.default.useState(false);
  const [y, setY] = _react.default.useState(0);
  const data = (0, _react.useMemo)(() => {
    if (!query) {
      return props.data;
    }
    return props.data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, props.data]);
  (0, _react.useEffect)(() => {
    setQuery('');
  }, [props.selectedData]);
  const renderValue = () => {
    if (!props?.selectedData) {
      return props?.placeholder || `Select ${props?.label || ''}`;
    }
    switch (typeof props?.selectedData?.value) {
      case 'string':
        return props?.selectedData?.value;
      case 'object':
        return props?.selectedData?.value?.name;
      default:
        return props?.placeholder || `Select ${props?.label || ''}`;
    }
  };
  if (!props.search) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.dropDownView, props.containerStyle],
      onLayout: e => {
        setY(e.nativeEvent.layout.y);
      },
      children: [props.label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.dropDownLabel, props.labelStyle],
        children: props.label
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        onPress: props.toggle,
        style: styles.btnDropDown,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.dropDownRow,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.btnDropDownText,
            children: renderValue()
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require('../imgs/chevron.png'),
            resizeMode: "contain",
            style: {
              width: 20,
              height: 20
            }
          })]
        })
      }), props.open && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DropDownFlatlist.DropDownFlatlist, {
        data: props.data,
        onSelect: props.onSelect,
        selectedBtnColor: props.selectedBtnColor,
        onSelectTitle: props.onSelectTitle,
        subButtonStyle: props.subButtonStyle,
        subTitleStyle: props.subTitleStyle,
        selectedData: props.selectedData,
        btnColor: props.btnColor,
        subBtnColor: props.subBtnColor,
        titleButtonStyle: props.titleButtonStyle,
        titleStyle: props.titleStyle,
        disabledTitleStyle: props.disabledTitleStyle,
        disabledButtonStyle: props.disabledButtonStyle,
        dropDownContainerStyle: props.dropDownContainerStyle,
        SubCheckedIcon: props.SubCheckedIcon,
        subViewStyle: props.subViewStyle,
        TitleIcon: props.TitleIcon,
        titleProps: props.titleProps,
        subTitleProps: props.subTitleProps,
        checkedIconPosition: props.checkedIconPosition,
        onEndReached: props.onEndReached,
        EmptyListView: props.EmptyListView,
        parentY: y,
        hasLabel: !!props.label,
        SubSeparator: props.SubSeparator,
        selectedSubBtnStyle: props.selectedSubBtnStyle,
        selectedSubTitleStyle: props.selectedSubTitleStyle
      })]
    });
  }
  if (!open && props.search) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.dropDownView, props.containerStyle],
      onLayout: e => {
        setY(e.nativeEvent.layout.y);
      },
      children: [props.label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.dropDownLabel, props.labelStyle],
        children: props.label
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        onPress: () => {
          setOpen(true);
          props.toggle();
        },
        style: styles.btnDropDown,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.dropDownRow,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.btnDropDownText,
            children: renderValue()
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require('../imgs/chevron-down.png'),
            resizeMode: "contain",
            style: {
              width: 20,
              height: 20
            }
          })]
        })
      })]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.dropDownView, props.containerStyle],
    onLayout: e => {
      setY(e.nativeEvent.layout.y);
    },
    children: [props.label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.dropDownLabel, props.labelStyle],
      children: props.label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.btnDropDown, {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [{
          flexDirection: 'row',
          flex: 1
        }, props.searchContainerStyle],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            width: 20
          },
          children: props.SearchIconLeft || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require('../imgs/search.png'),
            resizeMode: "contain",
            style: {
              width: 20,
              height: 20
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
          placeholder: props?.placeholder || `Search ${props?.label || ''}`,
          value: query,
          onChangeText: txt => {
            setQuery(txt);
            props.onChangeSearchText?.(txt);
          },
          style: [{
            flex: 1
          }, props.searchInputStyle]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          onPress: () => {
            setQuery('');
            props.onChangeSearchText?.('');
            if (!query) {
              setOpen(false);
              props.toggle();
            }
          },
          style: {
            width: 14
          },
          children: props.SearchIconRight || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require('../imgs/close.png'),
            resizeMode: "contain",
            style: {
              width: 14,
              height: 20
            }
          })
        })]
      })
    }), props.open && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DropDownFlatlist.DropDownFlatlist, {
      data: data,
      onSelect: value => {
        setOpen(false);
        props.onSelect(value);
      },
      selectedBtnColor: props.selectedBtnColor,
      onSelectTitle: props.onSelectTitle,
      subButtonStyle: props.subButtonStyle,
      subTitleStyle: props.subTitleStyle,
      selectedData: props.selectedData,
      btnColor: props.btnColor,
      subBtnColor: props.subBtnColor,
      titleButtonStyle: props.titleButtonStyle,
      titleStyle: props.titleStyle,
      disabledTitleStyle: props.disabledTitleStyle,
      disabledButtonStyle: props.disabledButtonStyle,
      dropDownContainerStyle: props.dropDownContainerStyle,
      SubCheckedIcon: props.SubCheckedIcon,
      subViewStyle: props.subViewStyle,
      TitleIcon: props.TitleIcon,
      titleProps: props.titleProps,
      subTitleProps: props.subTitleProps,
      checkedIconPosition: props.checkedIconPosition,
      onEndReached: props.onEndReached,
      EmptyListView: props.EmptyListView,
      parentY: y,
      hasLabel: !!props.label,
      SubSeparator: props.SubSeparator,
      selectedSubBtnStyle: props.selectedSubBtnStyle,
      selectedSubTitleStyle: props.selectedSubTitleStyle
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  dropDownView: {
    zIndex: 5,
    marginBottom: 20
  },
  btnDropDown: {
    minHeight: 40,
    minWidth: 120,
    borderColor: _colors.colors.grey1,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  btnDropDownText: {
    color: _colors.colors.dark,
    fontSize: 13
  },
  customErrorText: {
    color: _colors.colors.error,
    fontSize: 12,
    paddingLeft: 5,
    marginTop: 5
  },
  dropDownLabel: {
    fontSize: 13,
    paddingBottom: 3,
    color: _colors.colors.dark
  },
  dropDownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
var _default = exports.default = DropDownSelect;
//# sourceMappingURL=DropDownSelect.js.map