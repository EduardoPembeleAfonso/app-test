import {
    ActivityIndicator,
    TouchableOpacity,
    type TouchableOpacityProps,
  } from 'react-native'
  import React from 'react'
  import Icon from 'react-native-vector-icons/AntDesign'
  
  interface ButtonSocialProps extends TouchableOpacityProps {
    isLoading?: boolean
    icon: keyof typeof Icon.getRawGlyphMap | string
  }
  
  export default function ButtonSocial({
    icon,
    isLoading = false,
    ...rest
  }: ButtonSocialProps) {
  
    return (
      <TouchableOpacity
        disabled={isLoading}
        activeOpacity={0.8}
        className="flex flex-1 flex-row justify-center rounded-full bg-lights-800 px-16 py-[10px] dark:bg-zinc-800"
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Icon
            name={icon}
            size={22}
            color={'#888888'}
          />
        )}
      </TouchableOpacity>
    )
  }