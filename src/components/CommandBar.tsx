import { useState, useEffect, useRef } from "react";

export const CommandBar = ({
  isOpen,
  setIsOpen,
  setOperatingMode,
  setActiveTheme,
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const contRef = useRef<HTMLUListElement>(null);

  const commands = [
    {
      name: "Change to manual control mode",
      action: () => setOperatingMode("manual"),
    },
    {
      name: "Change to auto-playing mode",
      action: () => setOperatingMode("auto"),
    },
    {
      name: "Change to random playing mode",
      action: () => setOperatingMode("random"),
    },
    {
      name: "Switch to theme A",
      action: () => setActiveTheme("A"),
    },
    {
      name: "Switch to theme B",
      action: () => setActiveTheme("B"),
    },
    {
      name: "Switch to theme C",
      action: () => setActiveTheme("C"),
    },
    {
      name: "Switch to theme D",
      action: () => setActiveTheme("D"),
    },
    {
      name: "Switch to theme E",
      action: () => setActiveTheme("E"),
    },
    {
      name: "Switch to theme F",
      action: () => setActiveTheme("F"),
    },
  ];

  const filteredCommands = commands.filter((command) =>
    command.name
      .toLowerCase()
      .includes(searchTerm.replace("/", "").toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = (selectedIndex + 1) % filteredCommands.length;
      setSelectedIndex(newIndex);
      contRef.current.scrollTo({ top: 48 * newIndex });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex =
        (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
      setSelectedIndex(newIndex);
      contRef.current.scrollTo({ top: 48 * newIndex });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
        setSearchTerm("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-start justify-center pt-20"
      onClick={() => {
        setIsOpen(false);
        setSearchTerm("");
      }}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or search..."
          className="w-full p-4 text-lg bg-transparent focus:outline-none border-b border-gray-200 text-gray-900"
        />
        <ul ref={contRef} className="py-2 max-h-80 overflow-y-auto">
          {filteredCommands.map((command, index) => (
            <li
              key={command.name}
              onMouseMove={() => setSelectedIndex(index)}
              onClick={() => {
                command.action();
                setIsOpen(false);
                setSearchTerm("");
              }}
              className={`px-4 py-3 cursor-pointer flex justify-between items-center ${
                index === selectedIndex ? "bg-blue-500 text-white" : ""
              }`}
            >
              <span>{command.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
