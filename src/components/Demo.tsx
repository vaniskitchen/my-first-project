import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as Switch from "@radix-ui/react-switch";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Accordion from "@radix-ui/react-accordion";
import * as Avatar from "@radix-ui/react-avatar";
import * as Progress from "@radix-ui/react-progress";
import * as Separator from "@radix-ui/react-separator";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function Demo() {
  const [switchOn, setSwitchOn] = useState(false);
  const [progress] = useState(65);
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <Tooltip.Provider>
      <div className="min-h-screen bg-gray-950 text-white p-10 space-y-10 max-w-2xl mx-auto">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Radix Primitives + Tailwind v4
        </motion.h1>

        <Separator.Root className="bg-gray-800 h-px w-full" />

        {/* Avatar */}
        <motion.section className="space-y-2" custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Avatar</h2>
          <div className="flex gap-3">
            {["JD", "AB", "KM"].map((initials, i) => (
              <motion.div
                key={initials}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.15 }}
              >
                <Avatar.Root className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                  <Avatar.Fallback className="text-sm font-medium">{initials}</Avatar.Fallback>
                </Avatar.Root>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Switch */}
        <motion.section className="space-y-2" custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Switch</h2>
          <div className="flex items-center gap-3">
            <Switch.Root
              checked={switchOn}
              onCheckedChange={setSwitchOn}
              className="w-11 h-6 rounded-full bg-gray-700 data-[state=checked]:bg-violet-600 transition-colors cursor-pointer relative"
            >
              <Switch.Thumb className="block w-4 h-4 rounded-full bg-white shadow translate-x-1 data-[state=checked]:translate-x-6 transition-transform" />
            </Switch.Root>
            <AnimatePresence mode="wait">
              <motion.span
                key={switchOn ? "on" : "off"}
                className="text-sm text-gray-300"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.15 }}
              >
                {switchOn ? "Enabled" : "Disabled"}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Progress */}
        <motion.section className="space-y-2" custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Progress</h2>
          <Progress.Root className="h-2 bg-gray-800 rounded-full overflow-hidden w-full">
            <motion.div
              className="h-full bg-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </Progress.Root>
          <p className="text-xs text-gray-500">{progress}% complete</p>
        </motion.section>

        {/* Tabs */}
        <motion.section className="space-y-2" custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Tabs</h2>
          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex gap-1 bg-gray-900 p-1 rounded-lg">
              {["tab1", "tab2", "tab3"].map((t, i) => (
                <Tabs.Trigger
                  key={t}
                  value={t}
                  className="flex-1 py-1.5 rounded-md text-sm text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white transition-colors cursor-pointer relative"
                >
                  Tab {i + 1}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <AnimatePresence mode="wait">
              {["tab1", "tab2", "tab3"].map((t, i) =>
                activeTab === t ? (
                  <Tabs.Content key={t} value={t} forceMount>
                    <motion.div
                      className="mt-3 p-4 bg-gray-900 rounded-lg text-sm text-gray-300"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      Content for Tab {i + 1}
                    </motion.div>
                  </Tabs.Content>
                ) : null
              )}
            </AnimatePresence>
          </Tabs.Root>
        </motion.section>

        {/* Accordion */}
        <motion.section className="space-y-2" custom={4} variants={fadeUp} initial="hidden" animate="visible">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Accordion</h2>
          <Accordion.Root type="single" collapsible className="space-y-1">
            {["What is Radix?", "Why use primitives?", "How does Tailwind help?"].map((q, i) => (
              <Accordion.Item key={i} value={`item-${i}`} className="bg-gray-900 rounded-lg overflow-hidden">
                <Accordion.Trigger className="w-full text-left px-4 py-3 text-sm font-medium flex justify-between items-center cursor-pointer hover:bg-gray-800 transition-colors group">
                  {q}
                  <motion.span
                    className="text-gray-500"
                    animate={{}}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-none data-[state=closed]:animate-none">
                  <motion.div
                    className="px-4 pb-3 text-sm text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Radix provides accessible, unstyled components. You bring the styles via Tailwind.
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.section>

        {/* Tooltip + Dialog */}
        <motion.section className="space-y-2" custom={5} variants={fadeUp} initial="hidden" animate="visible">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Tooltip & Dialog</h2>
          <div className="flex gap-3">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <motion.button
                  className="px-4 py-2 bg-gray-800 rounded-lg text-sm cursor-pointer"
                  whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Hover me
                </motion.button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg" sideOffset={6}>
                  This is a tooltip
                  <Tooltip.Arrow className="fill-gray-700" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <motion.button
                  className="px-4 py-2 bg-violet-600 rounded-lg text-sm cursor-pointer"
                  whileHover={{ scale: 1.05, backgroundColor: "#7c3aed" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Open Dialog
                </motion.button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay asChild>
                  <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                  <motion.div
                    className="fixed top-1/2 left-1/2 bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl space-y-4"
                    initial={{ opacity: 0, scale: 0.92, x: "-50%", y: "-50%" }}
                    animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                    exit={{ opacity: 0, scale: 0.92, x: "-50%", y: "-50%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Dialog.Title className="text-lg font-semibold">Dialog Title</Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-400">
                      This is a Radix dialog styled with Tailwind v4. Fully accessible with focus trapping and keyboard support.
                    </Dialog.Description>
                    <Dialog.Close asChild>
                      <motion.button
                        className="px-4 py-2 bg-violet-600 rounded-lg text-sm cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Close
                      </motion.button>
                    </Dialog.Close>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </motion.section>
      </div>
    </Tooltip.Provider>
  );
}
