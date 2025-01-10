import { Dialog } from '@headlessui/react';
import { AlertCircle, CheckCircle2, Loader2, RotateCcw } from 'lucide-react';

export const MatchSubmissionDialog = ({ isOpen, isSubmitting, submitStatus, onClose, onReset }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}
      className="relative z-50"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 theme-transition-short" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-theme-surface border border-theme-border p-6 shadow-xl theme-transition-long">
          <div className="flex items-center gap-3">
            {isSubmitting && <Loader2 className="h-6 w-6 animate-spin text-theme-primary" />}
            {submitStatus === 'success' && <CheckCircle2 className="h-6 w-6 text-theme-winner" />}
            {submitStatus === 'error' && <AlertCircle className="h-6 w-6 text-theme-error" />}

            <Dialog.Title className="text-xl font-medium text-theme-text">
              {isSubmitting && 'Submitting match data...'}
              {submitStatus === 'success' && 'Match submitted successfully!'}
              {submitStatus === 'error' && 'Failed to submit match'}
            </Dialog.Title>
          </div>

          <Dialog.Description className="mt-2 text-theme-text-muted">
            {isSubmitting &&
              "This might take a minute while we process the stats. Please don't close this page."}
            {submitStatus === 'success' &&
              'The stats have been updated. Would you like to submit another match?'}
            {submitStatus === 'error' &&
              'There was an error processing your submission. Please try again.'}
          </Dialog.Description>

          {!isSubmitting && (
            <div className="mt-6 flex justify-end gap-3">
              {submitStatus === 'success' && (
                <button
                  onClick={onReset}
                  className="flex items-center gap-2 rounded bg-theme-winner text-theme-winner-text px-4 py-2 theme-transition-short hover:bg-theme-primary-dark"
                >
                  <RotateCcw className="h-4 w-4" />
                  Submit Another Match
                </button>
              )}
              {submitStatus === 'error' && (
                <button
                  onClick={onClose}
                  className="rounded border border-theme-error text-theme-error px-4 py-2 theme-transition-short hover:bg-theme-surface-secondary"
                >
                  Close and Try Again
                </button>
              )}
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
