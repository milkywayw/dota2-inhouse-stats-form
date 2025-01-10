import { Loader2 } from 'lucide-react';

const SubmitButton = ({ isSubmitting, onClick }) => (
  <button
    type="submit"
    onClick={onClick}
    disabled={isSubmitting}
    className={`w-full py-3 rounded font-medium theme-transition-short ${
      isSubmitting
        ? 'bg-theme-surface-secondary text-theme-text-muted cursor-not-allowed'
        : 'bg-theme-primary hover:bg-theme-primary-dark text-theme-primary-text'
    }`}
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        Submitting...
      </span>
    ) : (
      'Submit Match'
    )}
  </button>
);

export default SubmitButton;
