import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSwipeable } from 'react-swipeable';
import './App.css';

// Modal is for custom styling
Modal.setAppElement('#root');

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [savedSlots, setSavedSlots] = useState(Array(5).fill(false));
  const [transferSlot, setTransferSlot] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveSlot = () => {
    if (selectedSlot !== null) {
      const newSlots = [...savedSlots];
      newSlots[selectedSlot] = true;
      setSavedSlots(newSlots);
      closeModal();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setTransferSlot((prev) => (prev + 1) % savedSlots.length),
    onSwipedRight: () =>
      setTransferSlot((prev) => (prev - 1 + savedSlots.length) % savedSlots.length),
  });

  const transferBadge = () => {
    if (savedSlots[selectedSlot]) {
      const newSlots = [...savedSlots];
      newSlots[transferSlot] = true;
      newSlots[selectedSlot] = false;
      setSavedSlots(newSlots);
      setSelectedSlot(null);
    }
  };

  return (
    <div className="App">
      <h1>Saved Badges</h1>

      <nav className="sidebar">
        <button onClick={openModal}>Saved Badges</button>
      </nav>

      <div className="content">
        <h2>Saved Badge Slots</h2>
        <ul>
          {savedSlots.map((slot, index) => (
            <li key={index}>
              <label>Slot {index + 1}</label>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={slot}
                onChange={() =>
                  setSavedSlots((prev) => {
                    const newSlots = [...prev];
                    newSlots[index] = !newSlots[index];
                    return newSlots;
                  })
                }
              />
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal">
        <h2>Select Slot to Save</h2>
        <ul>
          {savedSlots.map((slot, index) => (
            <li
              key={index}
              onClick={() => setSelectedSlot(index)}
              className={selectedSlot === index ? 'selected' : ''}
            >
              Slot {index + 1}
            </li>
          ))}
        </ul>
        <button onClick={saveSlot}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      <div {...swipeHandlers} className="transfer-container">
        <h2>Transfer Slot</h2>
        <p>Swipe left/right to choose a slot to transfer the badge to</p>
        <p>Current slot selected for transfer: Slot {transferSlot + 1}</p>
        <button onClick={transferBadge}>Transfer Badge</button>
      </div>
    </div>
  );
}

export default App;
