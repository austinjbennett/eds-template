import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import '../../blocks/budget-planner/budget-planner.css';
import '../../blocks/lead-funnel/lead-funnel.css';
const preview: Preview = {
parameters: {
controls: {
matchers: {
color: /(background|color)$/i,
date: /Date$/i,
},
},
layout: 'padded',
},
};
export default preview;
