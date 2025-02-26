"use client";
import React, { useState } from "react";
import { Modal, Button } from "antd";

export default function TopicModal({ topic, onSave, onClose }) {
  const [formData, setFormData] = useState(topic || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal
      title={topic ? "Edit Topic" : "View Topic"}
      open={Boolean(topic)}
      onOk={handleSubmit}
      onCancel={onClose}
    >
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="chapter"
          placeholder="Chapter"
          value={formData.chapter || ""}
          onChange={handleChange}
        />
        {/* etc. */}
      </form>
    </Modal>
  );
}
