/* Small helpers shared by every script */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const RESUME_URL = 'assets/resume/Jayesh_Magdum_Resume.pdf';
