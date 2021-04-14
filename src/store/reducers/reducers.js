import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';
import authReducer from './auth.reducer.js';
import coursesReducer from './course.reducer.js';
import assessmentsReducer from './assessments.reducer.js';
import courseOutcomesReducer from './course-outcome.reducer.js';
import programOutcomesReducer from './program-outcome.reducer.js';
import gradingToolsReducer from './grading-tool.reducer.js';
import departmentsReducer from './department.reducer.js';
import studentsTakeSectionsReducer from './students-take-sections.reducer.js';
import instructorsGiveSectionsReducer from './instructors-give-sections.reducer.js';
import facultiesReducer from './faculties.reducer.js';
import sectionsReducer from './sections.reducer.js';
import usersReducer from './users.reducer.js';
import universityReducer from './universities.reducer.js';
import fileUploadReducer from './file-upload.reducer.js';
import popcoReducer from './po-provide-co.reducer.js';
import gtccoReducer from './gt-cover-co.reducer.js';
import sagtReducer from './students-answer-gt.reducer.js';


export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    auth: authReducer,
    assessments: assessmentsReducer,
    courseOutcomes: courseOutcomesReducer,
    fileUpload: fileUploadReducer,
    programOutcomes: programOutcomesReducer,
    studentsTakeSections: studentsTakeSectionsReducer,
    instructorsGiveSections: instructorsGiveSectionsReducer,
    gradingTools: gradingToolsReducer,
    courses: coursesReducer,
    popco: popcoReducer,
    gtcco: gtccoReducer,
    sagt: sagtReducer, 
    departments: departmentsReducer,
    faculties: facultiesReducer,
    sections: sectionsReducer,
    users: usersReducer,
    universities: universityReducer
});
