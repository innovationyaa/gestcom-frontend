# Design System Reference

> A comprehensive guide to the GestionCom UI design system for consistent component creation and page layouts.

## 🎨 Color Palette

### Core Colors (CSS Variables)

```css
/* Backgrounds */
--color-background: #fafafa /* Page background */ --color-surface: #ffffff
  /* Card/container backgrounds */ --color-border: #f0f0f0
  /* Standard borders */ /* Typography */ --color-foreground: #171717
  /* Primary text */ --color-foreground-muted: #737373 /* Secondary text */
  /* Brand Colors */ --color-blue: #3b82f6 /* Primary actions, focus states */
  --color-green: #22c55e /* Success states */ --color-orange: #f97316
  /* Warning states */ --color-red: #ef4444 /* Error/danger states */;
```

### Usage Guidelines

- **Primary Text**: `text-[var(--color-foreground)]`
- **Secondary Text**: `text-[var(--color-foreground-muted)]`
- **Backgrounds**: `bg-[var(--color-surface)]`
- **Borders**: `border-[var(--color-border)]`
- **Focus States**: `focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20`

## 📝 Typography

### Text Hierarchy

```jsx
{
  /* Page Title */
}
<h1 className="text-[var(--color-foreground)] text-xl font-semibold">
  Page Title
</h1>;

{
  /* Page Subtitle */
}
<p className="text-[var(--color-foreground-muted)] text-xs">
  Page description or subtitle
</p>;

{
  /* Section Title */
}
<h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
  Section Title
</h2>;

{
  /* Body Text */
}
<p className="text-[var(--color-foreground)] text-sm">Regular content text</p>;
```

### Text Sizes

- **Page Title**: `text-xl font-semibold`
- **Section Title**: `text-base font-medium`
- **Subtitle**: `text-xs`
- **Body**: `text-sm`

## 🏗️ Layout Structure

### Page Layout

```jsx
<div className="space-y-8 p-4">
  {/* Page Header */}
  <div className="flex items-center justify-between">
    <div className="space-y-1">
      <h1 className="text-[var(--color-foreground)] text-xl font-semibold">
        Page Title
      </h1>
      <p className="text-[var(--color-foreground-muted)] text-xs">
        Page description
      </p>
    </div>
    {/* Action Buttons */}
    <div className="flex gap-2">{/* Buttons here */}</div>
  </div>

  {/* Content Sections */}
  <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
    {/* Section content */}
  </div>
</div>
```

### Content Containers

```jsx
{
  /* Standard Container */
}
<div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
  <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
    Section Title
  </h2>
  {/* Content */}
</div>;
```

## 🔘 Buttons

### Primary Button

```jsx
<Button
  size="sm"
  className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
>
  <Plus className="h-4 w-4 mr-1" />
  Primary Action
</Button>
```

### Secondary Button

```jsx
<Button
  variant="outline"
  size="sm"
  className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
>
  <Download className="h-4 w-4 mr-1" />
  Secondary Action
</Button>
```

### Button Guidelines

- **Size**: Always use `size="sm"`
- **Icons**: `h-4 w-4 mr-1` for left-aligned icons
- **Spacing**: Use `flex gap-2` for button groups

## 🔍 Filters & Search

### Filter Container Layout

```jsx
{
  /* Search and Filters Container */
}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
  {/* Search Bar */}
  <div className="relative flex-1 max-w-md">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
    <Input
      placeholder="Rechercher..."
      className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
    />
  </div>

  {/* Filters */}
  <div className="flex items-center gap-3">{/* Filter components */}</div>
</div>;
```

### Search Input

```jsx
<div className="relative flex-1 max-w-md">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
  <Input
    placeholder="Rechercher..."
    className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
  />
</div>
```

### Select Filter

```jsx
<Select value={filterValue} onValueChange={setFilterValue}>
  <SelectTrigger className="w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
    <SelectValue placeholder="Filter Name" />
  </SelectTrigger>
  <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
    <SelectItem
      value="all"
      className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
    >
      Tous les éléments
    </SelectItem>
    <SelectItem
      value="option1"
      className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
    >
      Option 1
    </SelectItem>
  </SelectContent>
</Select>
```

### Input Filter

```jsx
<Input
  placeholder="Filter name"
  className="w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
/>
```

### Date Range Filter

```jsx
<SimpleDateRangePicker
  date={dateRange}
  setDate={setDateRange}
  className="w-auto"
/>
```

## 📊 Tables

### Table Container

```jsx
<div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
  <DataTable
    columns={columns}
    data={filteredData}
    loading={loading}
    onRowClick={handleRowClick}
    emptyMessage="Aucun élément trouvé."
    rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
  />
</div>
```

### Table Column Definition

```jsx
const columns = [
  {
    header: "Column Name",
    accessor: "dataField",
    cell: (row) => row.dataField,
  },
  {
    header: "Actions",
    accessor: "actions",
    align: "right",
    cell: (row) => (
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
```

## 🏷️ Status Badges

### Success Badge

```jsx
<Badge
  variant="secondary"
  className="bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)] border border-[var(--color-success)] border-opacity-20"
>
  <CheckCircle className="h-3 w-3 mr-1" />
  Succès
</Badge>
```

### Warning Badge

```jsx
<Badge
  variant="secondary"
  className="bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)] border border-[var(--color-warning)] border-opacity-20"
>
  <Clock className="h-3 w-3 mr-1" />
  En attente
</Badge>
```

### Error Badge

```jsx
<Badge
  variant="secondary"
  className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
>
  <XCircle className="h-3 w-3 mr-1" />
  Erreur
</Badge>
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)

### Filter Responsiveness

```jsx
{
  /* Responsive filter layout */
}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
  {/* Stacks on mobile, side-by-side on desktop */}
</div>;
```

## 🎯 Component Sizing

### Standard Dimensions

- **Filter Components**: `w-[140px]` (standard), `w-[160px]` (wider options)
- **Search Bar**: `flex-1 max-w-md`
- **Icons**: `h-4 w-4` (standard), `h-3 w-3` (badges)
- **Buttons**: `size="sm"`
- **Padding**: `p-4` (page), `p-6` (containers), `mb-4` (sections)
- **Spacing**: `gap-2` (buttons), `gap-3` (filters), `gap-4` (large), `space-y-8` (page sections)

## 🔧 Standard Patterns

### Page Creation Checklist

1. **Container**: `<div className="space-y-8 p-4">`
2. **Header**: Title + subtitle + action buttons
3. **Filters**: Search (left) + filters (right)
4. **Content**: White container with border and shadow
5. **Table**: DataTable with consistent column structure
6. **Responsive**: Use breakpoint classes
7. **Colors**: Use CSS variables consistently
8. **Typography**: Follow hierarchy
9. **Spacing**: Use standard measurements

### Filter Pattern

1. **Layout**: Search left, filters right
2. **Search**: Icon + input with focus states
3. **Selects**: Consistent width and styling
4. **Responsive**: Stack on mobile
5. **Clear functionality**: For date ranges and complex filters

This design system ensures visual consistency across all pages and components in the GestionCom application.
