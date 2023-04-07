import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
  selectedDate: Date;
  handleDateChange: (date: Date) => void;
}

const Calendar = ({ selectedDate, handleDateChange }: CalendarProps) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date) => handleDateChange(date)}
    />
  );
};

export default Calendar;