import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { theme } from '../../styles';

interface Props {
  showCancel?: boolean;
  disableCancel?: boolean;
  cancelLabel?: string;
  cancelIcon?: string;
  cancelIconColor?: string;
  onCancelClicked?: () => void;
  showAction?: boolean;
  disableAction?: boolean;
  onActionClicked?: () => void;
  actionLabel?: string;
  actionIcon?: string;
  actionIconColor?: string;
  loading?: boolean;
  containerStyles?: object;
  actionButtonsStyles?: object;
  cancelButtonTouchableStyles?: object;
  cancelButtonStyles?: object;
  cancelButtonLabelStyles?: object;
  actionButtonTouchableStyles?: object;
  actionButtonStyles?: object;
  actionButtonLabelStyles?: object;
}

export function ActionButtons({
  showCancel = true,
  disableCancel = false,
  onCancelClicked = () => undefined,
  cancelLabel = undefined,
  cancelIcon = 'cancel',
  cancelIconColor = theme.colors.default,
  showAction = true,
  disableAction = false,
  onActionClicked = () => undefined,
  actionLabel = 'Done',
  actionIcon = undefined, // or eg. 'check-circle',
  actionIconColor = theme.colors.white,
  // loading = false,
  containerStyles = {},
  actionButtonsStyles = {},
  cancelButtonTouchableStyles = {},
  cancelButtonStyles = {},
  cancelButtonLabelStyles = {},
  actionButtonTouchableStyles = {},
  actionButtonStyles = {},
  actionButtonLabelStyles = {},
}: Props) {
  return (
    <View style={{ ...defaultStyles.container, ...containerStyles }}>
      <View style={[{ ...defaultStyles.actionButtons, ...actionButtonsStyles }]}>
        {showCancel && (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={() => {
              onCancelClicked();
            }}
            style={{ ...defaultStyles.cancelButtonTouchable, ...cancelButtonTouchableStyles }}
          >
            <View style={{ ...defaultStyles.cancelButton, ...cancelButtonStyles }}>
              {cancelIcon && <IconButton color={cancelIconColor} icon={cancelIcon} />}
              {!!cancelLabel && <Text style={{ ...defaultStyles.cancelButtonLabel, ...cancelButtonLabelStyles }}>{cancelLabel}</Text>}
            </View>
          </TouchableWithoutFeedback>
        )}
        {showAction && (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={() => {
              onActionClicked();
            }}
            style={{ ...defaultStyles.actionButtonTouchable, ...actionButtonTouchableStyles }}
          >
            <View style={{ ...defaultStyles.actionButton, ...actionButtonStyles }}>
              {actionIcon && <IconButton color={actionIconColor} icon={actionIcon} />}
              {!!actionLabel && <Text style={{ ...defaultStyles.actionButtonLabel, ...actionButtonLabelStyles }}>{actionLabel}</Text>}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    overflow: 'hidden',
    height: 41,
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  cancelButtonTouchable: {
    overflow: 'hidden',
  },
  cancelButton: {
    width: 54,
    height: 41,
    // flex: Platform.OS === 'android' ? 0 : 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 0,
    borderColor: theme.colors.defaultBorder,
    borderWidth: 1,
    borderRightWidth: 0,
  },
  cancelButtonLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingRight: 35,
  },
  actionButtonTouchable: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 0,
    backgroundColor: theme.colors.primary,
  },
  actionButtonLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingRight: 35,
  },
});
