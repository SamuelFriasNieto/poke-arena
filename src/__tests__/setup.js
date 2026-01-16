import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// ReactRouter
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
