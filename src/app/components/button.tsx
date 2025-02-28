import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native'
  import React from 'react'
  import colors from 'tailwindcss/colors'
  
  interface ButtonProps {
    text: string
    IconLeft?: React.ReactNode
    IconRight?: React.ReactNode
    onClick?: () => void
    isLoading?: boolean
    disabled?: boolean
  }
  
  export default function Button({
    IconLeft,
    IconRight,
    text,
    onClick,
    isLoading,
  }: ButtonProps) {
    return (
      <TouchableOpacity
        onPress={onClick}
        disabled={isLoading}
        activeOpacity={0.7}
        style={styles.input}
      >
        <View className={`mr-2 ${!IconLeft && 'hidden'}`}>{IconLeft}</View>
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text className="font-body text-base text-white">{text}</Text>
        )}
        <View className={`ml-2 ${!IconRight && 'hidden'}`}>{IconRight}</View>
      </TouchableOpacity>
    )
  }
  
  const styles = StyleSheet.create({
    input: {
      height: 60,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#6131D2',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
  })