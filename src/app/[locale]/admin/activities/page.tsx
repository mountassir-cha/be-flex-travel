export default function AdminActivitiesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-foreground">Activities</h1>
      </div>
      
      <div className="p-8 text-center text-foreground/50 bg-card rounded-2xl border border-[var(--brand-gold)]/10">
        <p className="mb-2">Activity management interface goes here.</p>
        <p className="text-sm">In a full production build, this would include a data table with Add/Edit/Delete capabilities for the activities table.</p>
      </div>
    </div>
  )
}
