import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, ActivityIndicator } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { theme } from 'mediashare/styles';

interface Props {
  loading?: boolean;
  showPrimary?: boolean;
  disablePrimary?: boolean;
  onPrimaryClicked?: () => void;
  primaryLabel?: string;
  primaryIcon?: string;
  primaryIconColor?: string;
  showSecondary?: boolean;
  disableSecondary?: boolean;
  secondaryLabel?: string;
  secondaryIcon?: string;
  secondaryIconColor?: string;
  onSecondaryClicked?: () => void;
  containerStyles?: object;
  actionButtonsStyles?: object;
  primaryButtonTouchableStyles?: object;
  primaryButtonStyles?: object;
  primaryButtonLabelStyles?: object;
  secondaryButtonTouchableStyles?: object;
  secondaryButtonStyles?: object;
  secondaryButtonLabelStyles?: object;
}

export function ActionButtons({
  showSecondary = true,
  disableSecondary = false,
  onSecondaryClicked = () => undefined,
  secondaryLabel = undefined,
  secondaryIcon = 'cancel',
  secondaryIconColor = theme.colors.default,
  showPrimary = true,
  disablePrimary = false,
  onPrimaryClicked = () => undefined,
  primaryLabel = 'Done',
  primaryIcon = undefined, // or eg. 'check-circle',
  primaryIconColor = theme.colors.white,
  loading = false,
  containerStyles = {},
  actionButtonsStyles = {},
  secondaryButtonTouchableStyles = {},
  secondaryButtonStyles = {},
  secondaryButtonLabelStyles = {},
  primaryButtonTouchableStyles = {},
  primaryButtonStyles = {},
  primaryButtonLabelStyles = {},
}: Props) {
  return (
    <View style={{ ...defaultStyles.container, ...containerStyles }}>
      <View style={[{ ...defaultStyles.actionButtons, ...actionButtonsStyles }]}>
        {showSecondary && (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={() => {
              onSecondaryClicked();
            }}
            style={{ ...defaultStyles.secondaryButtonTouchable, ...secondaryButtonTouchableStyles }}
          >
            <View style={{ ...defaultStyles.secondaryButton, ...secondaryButtonStyles }}>
              {secondaryIcon && <IconButton iconColor={secondaryIconColor} icon={secondaryIcon} />}
              {!!secondaryLabel && <Text style={{ ...defaultStyles.secondaryButtonLabel, ...secondaryButtonLabelStyles }}>{secondaryLabel}</Text>}
            </View>
          </TouchableWithoutFeedback>
        )}
        {showPrimary && (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={() => {
              if (!disablePrimary && !loading) {
                onPrimaryClicked();
              }
            }}
            style={{ ...defaultStyles.primaryButtonTouchable, ...primaryButtonTouchableStyles }}
          >
            <View style={{ ...defaultStyles.primaryButton, ...primaryButtonStyles, ...(disablePrimary ? defaultStyles.primaryButtonDisabled : {}) }}>
              {loading && <ActivityIndicator size="small" color={primaryIconColor} style={{ paddingRight: 15 }} />}
              {primaryIcon && <IconButton iconColor={primaryIconColor} icon={primaryIcon} />}
              {!!primaryLabel && (
                <Text
                  style={{
                    ...defaultStyles.primaryButtonLabel,
                    ...primaryButtonLabelStyles,
                    ...(disablePrimary ? defaultStyles.primaryButtonLabelDisabled : {}),
                  }}
                >
                  {primaryLabel}
                </Text>
              )}
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
  primaryButtonTouchable: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
  },
  primaryButton: {
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
  primaryButtonDisabled: {
    backgroundColor: theme.colors.secondary,
  },
  primaryButtonLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: theme.fonts.medium.fontFamily,
    color: '#ffffff',
    paddingRight: 35,
  },
  primaryButtonLabelDisabled: {
    color: theme.colors.defaultBorder,
  },
  secondaryButtonTouchable: {
    overflow: 'hidden',
  },
  secondaryButton: {
    width: 54,
    height: 41,
    // flex: Platform.OS === 'android' ? 0 : 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 0,
    backgroundColor: theme.colors.surface,
  },
  secondaryButtonLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingRight: 35,
  },
});
