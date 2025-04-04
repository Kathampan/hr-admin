import React, { useEffect } from "react";

const DashboardCards = ({ cards }) => {
  useEffect(() => {
    const boxes = document.querySelectorAll(".fade-in");
    boxes.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  return (
   

      <div className="d-flex align-items-center gap-5 justify-content-center">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="box fade-in"
            onClick={() => (window.location.href = card.link)}
          >
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
   
  );
};

export default DashboardCards;
