
export const FRAMEWORKS = [
  { id: 'RISE', name: 'RISE (Role, Input, Steps, Expectation)' },
  { id: 'CRISPE', name: 'CRISPE (Capacity, Role, Insight, Statement, Personality, Experiment)' },
  { id: 'SMART', name: 'SMART (Specific, Measurable, Actionable, Relevant, Time-bound)' },
  { id: 'CoT', name: 'Chain of Thought (CoT)' },
  { id: 'FewShot', name: 'Few-Shot Learning' },
  { id: 'SystemUser', name: 'System-User Prompt' },
  { id: 'TreeOfThought', name: 'Tree-of-Thought' },
  { id: 'Hybrid', name: 'Hybrid (Mixed Frameworks)' }
];

export const DEFAULT_INPUT: { framework: string, purpose: string, goal: string } = {
  framework: 'RISE',
  purpose: 'Build Chatbot',
  goal: 'Optimize prompt for precision and clarity'
};
