import Toast from 'react-native-root-toast'
import colors from 'tailwindcss/colors'

export const Alert = (message: string, delayTime?: number) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    backgroundColor: colors.violet[800],
    textColor: colors.white,
    delay: delayTime || 0,
  })
}