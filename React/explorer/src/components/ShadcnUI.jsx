import React from 'react';
import { Calendar } from "@/components/ui/calendar"; // Make sure this path is correct

const ShadcnUI = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <div style={{ padding: "1rem" , backgroundColor: "#f0f0f0", borderRadius: "8px", margin: '20px', textAlign: 'center' }}>
      <h2 className="text-2xl font-bold mb-4">Shadcn UI Calendar</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm bg-white p-4 mx-auto"
        captionLayout="dropdown"

      />
    </div>
  );
};

export default ShadcnUI;
