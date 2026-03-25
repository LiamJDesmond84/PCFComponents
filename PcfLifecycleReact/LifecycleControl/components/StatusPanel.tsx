import * as React from "react";

interface StatusPanelProps {
  message: string;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ message }) => {
  return (
    <div style={{ marginTop: 12 }}>
      <strong>Status:</strong> {message}
    </div>
  );
};