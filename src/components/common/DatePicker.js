import React from 'react'
import { StyleSheet, Text } from 'react-native'
import ModalDatePicker from './ModalDatePicker'


const DatePicker = ({ style, textStyle, minimumDate, maximumDate, defaultDate, onDateChange, placeHolderText, textColor, placeHolderTextColor, ...props }) => (
  <ModalDatePicker
    style={[styles.container, style]}
    renderDate={({ year, month, day, date }) => {
      if (!date) {
        return <Text style={[styles.text, { ...styles.placeholderText, color: placeHolderTextColor || '#7C7C7C' },]}>{placeHolderText || 'Select date'}</Text>
      }
      const dateStr = `${day}-${month}-${year}`
      return <Text style={{ ...styles.text, ...textStyle, color: textColor }}>{dateStr}</Text>
    }}
    startDate={defaultDate}
    minDate={minimumDate}
    maxDate={maximumDate}

    onDateChanged={(date) => {

      onDateChange(date.date)
    }}
  />
)

const styles = StyleSheet.create({
  container: {

    height: 40,
    justifyContent: 'center'
  },
  placeholderText: {

    color: '#7C7C7C'
  },
  text: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: Colors.black
  }
})

export default DatePicker