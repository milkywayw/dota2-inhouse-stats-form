const HeaderSection = ({ formData, setFormData, touched, errors }) => (
  <div className="mb-8">
    <h1 className="text-2xl font-bold mb-4">Match Entry</h1>
    <div className="flex gap-4">
      <div>
        <label className="block text-sm mb-1">Date of Inhouse</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className={`px-3 py-2 rounded border ${
            errors.date && touched ? 'border-theme-error' : 'border-theme-border'
          }`}
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm mb-1">Notes</label>
        <input
          type="text"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Optional notes about the match"
          className="w-full px-3 py-2 rounded border border-theme-border"
        />
      </div>
    </div>
  </div>
);

export default HeaderSection;
