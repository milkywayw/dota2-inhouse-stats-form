import { useMatchForm } from '../../hooks/useMatchForm';
import { TEAMS } from '../../formConfig';
import { transformFormDataForSubmission } from '../../utils/transformFormData';
import { submitMatchToStatsServer } from '../../services/matchApi';
import {
  playMeepMerp,
  startDuelDrums,
  stopDuelDrums,
  playVictorySounds,
} from '../../utils/soundEffects';

import HeaderSection from './HeaderSection';
import BansSection from './BansSection';
import TeamSection from './TeamSection';
import SubmitButton from './SubmitButton';
import { MatchSubmissionDialog } from '../ui/dialog/MatchSubmissionDialog';

const MatchForm = () => {
  const {
    formData,
    setFormData,
    touched,
    setTouched,
    errors,
    isSubmitting,
    setIsSubmitting,
    submitStatus,
    setSubmitStatus,
    validate,
    resetForm,
    getAvailableHeroes,
    getAvailablePlayers,
  } = useMatchForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!validate()) {
      playMeepMerp();
      return;
    }

    setIsSubmitting(true);
    startDuelDrums();

    try {
      const transformedData = transformFormDataForSubmission(formData);
      await submitMatchToStatsServer(transformedData);
      setSubmitStatus('success');
      playVictorySounds(); // Play both victory sounds simultaneously!
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      stopDuelDrums();
      playMeepMerp();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 transition-colors">
        <HeaderSection
          formData={formData}
          setFormData={setFormData}
          touched={touched}
          errors={errors}
        />

        <BansSection
          formData={formData}
          setFormData={setFormData}
          getAvailableHeroes={getAvailableHeroes}
          touched={touched}
        />

        {TEAMS.map((team) => (
          <TeamSection
            key={team}
            team={team}
            formData={formData}
            setFormData={setFormData}
            getAvailablePlayers={getAvailablePlayers}
            getAvailableHeroes={getAvailableHeroes}
            touched={touched}
            errors={errors}
          />
        ))}

        <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
      </div>

      <MatchSubmissionDialog
        isOpen={isSubmitting || submitStatus !== null}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        onClose={() => {
          if (!isSubmitting) {
            setSubmitStatus(null);
            resetForm();
          }
        }}
        onReset={resetForm}
      />
    </>
  );
};

export default MatchForm;
