import { Holiday } from './types';

const FLOATING_HOLIDAYS: Record<number, Holiday[]> = {
  2024: [
    { date: '2024-03-25', name: 'Holi' },
    { date: '2024-04-11', name: 'Eid ul-Fitr' },
    { date: '2024-08-26', name: 'Janmashtami' },
    { date: '2024-10-12', name: 'Dussehra' },
    { date: '2024-11-01', name: 'Diwali' },
  ],
  2025: [
    { date: '2025-03-14', name: 'Holi' },
    { date: '2025-03-31', name: 'Eid ul-Fitr' },
    { date: '2025-08-16', name: 'Janmashtami' },
    { date: '2025-10-02', name: 'Dussehra' },
    { date: '2025-10-20', name: 'Diwali' },
    { date: '2025-10-21', name: 'Govardhan Puja' },
    { date: '2025-10-22', name: 'Bhai Dooj' },
  ],
  2026: [
    { date: '2026-03-03', name: 'Holi' },
    { date: '2026-03-20', name: 'Eid ul-Fitr' },
    { date: '2026-09-04', name: 'Janmashtami' },
    { date: '2026-10-19', name: 'Dussehra' },
    { date: '2026-11-08', name: 'Diwali' },
    { date: '2026-11-09', name: 'Govardhan Puja' },
    { date: '2026-11-10', name: 'Bhai Dooj' },
  ],
  2027: [
    { date: '2027-03-22', name: 'Holi' },
    { date: '2027-03-10', name: 'Eid ul-Fitr' },
    { date: '2027-08-25', name: 'Janmashtami' },
    { date: '2027-10-09', name: 'Dussehra' },
    { date: '2027-10-29', name: 'Diwali' },
  ],
  2028: [
    { date: '2028-03-11', name: 'Holi' },
    { date: '2028-02-28', name: 'Eid ul-Fitr' },
    { date: '2028-08-13', name: 'Janmashtami' },
    { date: '2028-09-28', name: 'Dussehra' },
    { date: '2028-10-17', name: 'Diwali' },
  ],
  2029: [
    { date: '2029-02-28', name: 'Holi' },
    { date: '2029-02-16', name: 'Eid ul-Fitr' },
    { date: '2029-09-01', name: 'Janmashtami' },
    { date: '2029-10-17', name: 'Dussehra' },
    { date: '2029-11-05', name: 'Diwali' },
  ],
  2030: [
    { date: '2030-03-19', name: 'Holi' },
    { date: '2030-02-06', name: 'Eid ul-Fitr' },
    { date: '2030-08-21', name: 'Janmashtami' },
    { date: '2030-10-06', name: 'Dussehra' },
    { date: '2030-10-26', name: 'Diwali' },
  ]
};

const FIXED_HOLIDAYS = [
  { month: 1, day: 1, name: 'New Year' },
  { month: 1, day: 26, name: 'Republic Day' },
  { month: 5, day: 1, name: 'Labour Day' },
  { month: 8, day: 15, name: 'Independence Day' },
  { month: 9, day: 5, name: "Teacher's Day" },
  { month: 10, day: 2, name: 'Gandhi Jayanti' },
  { month: 12, day: 25, name: 'Christmas' }
];

export const FIXED_HOLIDAYS_NAMES = FIXED_HOLIDAYS.map(h => h.name);

export function generateHolidaysForPeriod(startDateStr: string, endDateStr: string): Holiday[] {
  const start = new Date(startDateStr + 'T00:00:00');
  const end = new Date(endDateStr + 'T00:00:00');
  
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  
  const generatedHolidays: Holiday[] = [];

  for (let year = startYear; year <= endYear; year++) {
    // Add fixed holidays
    FIXED_HOLIDAYS.forEach(fh => {
      const dateStr = `${year}-${String(fh.month).padStart(2, '0')}-${String(fh.day).padStart(2, '0')}`;
      const dateObj = new Date(dateStr + 'T00:00:00');
      if (dateObj >= start && dateObj <= end) {
        generatedHolidays.push({ date: dateStr, name: fh.name });
      }
    });

    // Add floating holidays
    if (FLOATING_HOLIDAYS[year]) {
      FLOATING_HOLIDAYS[year].forEach(fh => {
        const dateObj = new Date(fh.date + 'T00:00:00');
        if (dateObj >= start && dateObj <= end) {
          generatedHolidays.push(fh);
        }
      });
    }
  }

  // Sort by date
  return generatedHolidays.sort((a, b) => a.date.localeCompare(b.date));
}
