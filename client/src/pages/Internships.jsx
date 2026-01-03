import React, { useEffect, useState } from "react";
import { getInternships } from "../api/internships";
import InternshipCard from "../components/InternshipCard";


export default function Internships() {
  const [internships, setInternships] = useState([]);

  const load = async () => {
    const data = await getInternships();
    setInternships(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">


      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((i) => (
          <InternshipCard
          key={i._id}
          internship={i}
        />        
        ))}
      </div>
    </div>
  );
}
