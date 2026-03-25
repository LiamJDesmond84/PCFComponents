import * as React from "react";
import { useState, useEffect, useCallback } from "react";

export interface LifecycleDemoProps {
  value: string;
  onTextChange: (value: string) => void;
}

export const LifecycleDemo: React.FC<LifecycleDemoProps> = ({
  value,
  onTextChange
}: LifecycleDemoProps) => {
  const [draftValue, setDraftValue] = useState<string>(value ?? "");

  useEffect((): void => {
    setDraftValue(value ?? "");
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setDraftValue(e.target.value);
    },
    []
  );

  const handleSave = useCallback((): void => {
    onTextChange(draftValue);
  }, [draftValue, onTextChange]);

  return (
    <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", padding: 12 }}>
      <h3>PCF Demo</h3>

      <div style={{ marginBottom: 10 }}>
        <strong>Official value from context:</strong> {value ?? "(empty)"}
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          value={draftValue}
          onChange={handleChange}
          placeholder="Type something..."
          style={{ padding: 6, marginRight: 8 }}
        />
        <button
          type="button"
          onClick={handleSave}
          style={{ padding: "6px 10px" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};


// import * as React from "react";
// import { useState, useEffect, useCallback } from "react";

// export interface LifecycleDemoProps {
//     value: string;
//     updatedProperties: string[];
//     lifecycleEvents: string[];
//     onTextChange: (value: string) => void;
//     onClearTimeline: () => void;
// }

// export const LifecycleDemo: React.FC<LifecycleDemoProps> = ({
//     value,
//     updatedProperties,
//     lifecycleEvents,
//     onTextChange,
//     onClearTimeline
// }: LifecycleDemoProps) => {
//     const [draftValue, setDraftValue] = useState<string>(value ?? "");

//     useEffect((): void => {
//         setDraftValue(value ?? "");
//     }, [value]);

//     const handleChange = useCallback(
//         (e: React.ChangeEvent<HTMLInputElement>): void => {
//             setDraftValue(e.target.value);
//         },
//         []
//     );

//     const handleSave = useCallback((): void => {
//         onTextChange(draftValue);
//     }, [draftValue, onTextChange]);

//     return (
//         <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", padding: 12 }}>
//             <h3>PCF Lifecycle Demo</h3>

//             <div style={{ marginBottom: 10 }}>
//                 <strong>Official value from context:</strong> {value ?? "(empty)"}
//             </div>

//             <div style={{ marginBottom: 10 }}>
//                 <input
//                     value={draftValue}
//                     onChange={handleChange}
//                     placeholder="Type something..."
//                     style={{ padding: 6, marginRight: 8 }}
//                 />
//                 <button
//                     type="button"
//                     onClick={handleSave}
//                     style={{ padding: "6px 10px", marginRight: 8 }}
//                 >
//                     Save
//                 </button>
//                 <button
//                     type="button"
//                     onClick={onClearTimeline}
//                     style={{ padding: "6px 10px" }}
//                 >
//                     Clear Timeline
//                 </button>
//             </div>

//             <div style={{ marginBottom: 10 }}>
//                 <strong>Lifecycle:</strong>
//                 <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
//                     {lifecycleEvents.length > 0
//                         ? lifecycleEvents.map((event, index) => `${index + 1}. ${event}`).join("\n")
//                         : "(none)"}
//                 </pre>
//             </div>

//             <div>
//                 <strong>updatedProperties:</strong>{" "}
//                 {updatedProperties.length > 0 ? updatedProperties.join(", ") : "(none)"}
//             </div>
//         </div>
//     );
// };