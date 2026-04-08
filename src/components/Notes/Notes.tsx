import { Pencil } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { format } from 'date-fns';
import './Notes.css';

interface NotesProps {
  monthKey: string;
  startDate: Date | null;
  endDate: Date | null;
}

const Notes = ({ monthKey, startDate, endDate }: NotesProps) => {
  const getKey = () => {
    if (startDate && endDate) {
      return `notes-${format(startDate, 'yyyy-MM-dd')}-to-${format(endDate, 'yyyy-MM-dd')}`;
    }
    if (startDate) {
      return `notes-${format(startDate, 'yyyy-MM-dd')}`;
    }
    return `notes-${monthKey}`;
  };

  const [note, setNote] = useLocalStorage<string>(getKey(), '');

  const getHeaderTitle = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`;
    }
    if (startDate) {
      return `${format(startDate, 'MMM d')} Notes`;
    }
    return `${monthKey.replace('-', ' ')}`;
  };

  const getPlaceholder = () => {
    if (startDate) {
      return "Jot down memos for this specific selection...";
    }
    return "Tap here to jot down general memos...";
  };

  return (
    <div className="notes-container group">
      <div className="notes-header">
        <span>{getHeaderTitle()}</span>
        <Pencil size={14} className="notes-icon" />
      </div>
      <textarea
        className="notes-textarea"
        placeholder={getPlaceholder()}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
};

export default Notes;
