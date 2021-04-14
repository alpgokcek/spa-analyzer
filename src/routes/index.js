
import React, { Suspense } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DEFINE, FILE_UPLOAD, RESET, ROLES } from 'AppConstants';

import PageLoader from 'Components/Common/PageLoader';

import Base from 'Components/Layout/Base';
import BasePage from 'Components/Layout/BasePage';
import Faculties from 'Pages/Faculties';
import FacultiesEdit from 'Pages/Faculties/edit';

import Assessments from 'Pages/Assessments';
import AssessmentsEdit from 'Pages/Assessments/edit';

import Courses from 'Pages/Courses';
import CoursesEdit from 'Pages/Courses/edit';

import Sections from 'Pages/Sections';
import SectionsEdit from 'Pages/Sections/edit';

import StudentsTakeSections from 'Pages/StudentsTakeSections';
import StudentsTakeSectionsEdit from 'Pages/StudentsTakeSections/edit';

import StudentsAnswerGT from 'Pages/StudentsAnswerGT';
import StudentsAnswerGTEdit from 'Pages/StudentsAnswerGT/edit';

import InstructorsGiveSections from 'Pages/InstructorsGiveSections';
import InstructorsGiveSectionsEdit from 'Pages/InstructorsGiveSections/edit';

import CourseOutcomes from 'Pages/CourseOutcomes';
import CourseOutcomesEdit from 'Pages/CourseOutcomes/edit';

import ProgramOutcomes from 'Pages/ProgramOutcomes';
import ProgramOutcomesEdit from 'Pages/ProgramOutcomes/edit';

import GradingTools from 'Pages/GradingTools';
import GradingToolsEdit from 'Pages/GradingTools/edit';

import Departments from 'Pages/Departments';
import DepartmentsEdit from 'Pages/Departments/edit';

import POProvideCO from 'Pages/POProvideCO';
import POProvideCOEdit from 'Pages/POProvideCO/edit';

import GTCoverCO from 'Pages/GTCoverCO';
import GTCoverCOEdit from 'Pages/GTCoverCO/edit';

import UserEdit from 'Pages/Users/edit';
import RestrictedRoute from './RestrictedRoute';

import Login from 'Pages/Login';
import ResetPassword from 'Pages/ResetPassword';
import NotFound from 'Pages/NotFound';
import Home from 'Pages/Home';
import Users from 'Pages/Users';
import FileUpload from 'Components/FileUpload';

// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    '/giris-yap',
    '/sifre-sifirlama',
    '/sifre-tanimlama',
    '/404'
];

const Routes = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    if(listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader/>}>
                    <Switch location={location}>
                        <Route exact path="/giris-yap" component={Login}/>
                        <Route exact path="/sifre-sifirlama" render={() => <ResetPassword type={RESET}/>}/>
                        <Route exact path="/sifre-tanimlama" render={() => <ResetPassword type={DEFINE}/>}/>
                        <Route exact path="/404" component={NotFound}/>
                    </Switch>
                </Suspense>
            </BasePage>
        )
    }
    else {
        return (
            // Layout component wrapper
            // Use <BaseHorizontal> to change layout
            <Base>
              <TransitionGroup>
                <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                    <div>
                        <Suspense fallback={<PageLoader/>}>
                            <Switch location={location}>
                                <RestrictedRoute exact path="/" component={Home} roles={Object.values(ROLES)}/>
                                
                                <RestrictedRoute exact path="/faculties/" component={Faculties} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/faculties/create" component={FacultiesEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/faculties/edit/:id" component={FacultiesEdit} roles={[ROLES.ADMIN]}/>
                                
                                <RestrictedRoute exact path="/assessments/create" component={AssessmentsEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/assessments/:courseId" component={Assessments} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/assessments/:courseId/edit/:id" component={AssessmentsEdit} roles={[ROLES.ADMIN]}/>
                                
                                <RestrictedRoute exact path="/courses/import" render={() => <FileUpload fileType={FILE_UPLOAD.COURSE_FILE}/>} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/courses/create" component={CoursesEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/courses/:departmentId" component={Courses} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/courses/:departmentId/edit/:id" component={CoursesEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/program-outcomes/import" render={() => <FileUpload fileType={FILE_UPLOAD.PO_FILE}/>} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/program-outcomes/create" component={ProgramOutcomesEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/program-outcomes/:departmentId" component={ProgramOutcomes} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/program-outcomes/:departmentId/edit/:id" component={ProgramOutcomesEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/course-outcomes/create" component={CourseOutcomesEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/course-outcomes/:courseId" component={CourseOutcomes} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/course-outcomes/:courseId/edit/:id" component={CourseOutcomesEdit} roles={[ROLES.ADMIN]}/>
                                
                                <RestrictedRoute exact path="/sections/import" render={() => <FileUpload fileType={FILE_UPLOAD.SECTIONS_FILE}/>} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/sections/:courseId/create" component={SectionsEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/sections/:courseId" component={Sections} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/sections/:courseId/edit/:id" component={SectionsEdit} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/sections/spa-file-upload/:sectionId" render={() => <FileUpload fileType={FILE_UPLOAD.SPA_FILE}/>} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/students-take-sections/import" render={() => <FileUpload fileType={FILE_UPLOAD.STS_FILE}/>} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/students-take-sections/create" component={StudentsTakeSectionsEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/students-take-sections/student/:studentId" component={StudentsTakeSections} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/students-take-sections/section/:sectionId" component={StudentsTakeSections} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/students-take-sections/edit/:id" component={StudentsTakeSectionsEdit} roles={[ROLES.ADMIN]}/>
                                
                                <RestrictedRoute exact path="/instructors-give-sections/import" render={() => <FileUpload fileType={FILE_UPLOAD.IGS_FILE}/>} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/instructors-give-sections/create" component={InstructorsGiveSectionsEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/instructors-give-sections/instructor/:instructorId" component={InstructorsGiveSections} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/instructors-give-sections/section/:sectionId" component={InstructorsGiveSections} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/instructors-give-sections/edit/:id" component={InstructorsGiveSectionsEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/gt-cover-co/:courseId/create" component={GTCoverCOEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/gt-cover-co/:courseId/grading-tool/:gradingToolId" component={GTCoverCO} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/gt-cover-co/:courseId/course-outcome/:courseOutcomeId" component={GTCoverCO} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/gt-cover-co/:courseId/edit/:id" component={GTCoverCOEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/students-answer-gt/:courseId/create" component={StudentsAnswerGTEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/students-answer-gt/:courseId/grading-tool/:gradingToolId" component={StudentsAnswerGT} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/students-answer-gt/:courseId/student/:studentId" component={StudentsAnswerGT} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/students-answer-gt/:courseId/edit/:id" component={StudentsAnswerGTEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/po-provide-co/:courseId/create" component={POProvideCOEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/po-provide-co/:courseId/program-outcome/:programOutcomeId" component={POProvideCO} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/po-provide-co/:courseId/course-outcome/:courseOutcomeId" component={POProvideCO} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/po-provide-co/:courseId/edit/:id" component={POProvideCOEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/students-answer-gt/create" component={InstructorsGiveSectionsEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/students-answer-gt/:gradingToolId" component={InstructorsGiveSections} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/students-answer-gt/edit/:id" component={InstructorsGiveSectionsEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/grading-tools/:courseId/create" component={GradingToolsEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/grading-tools/:courseId/:assessmentId" component={GradingTools} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/grading-tools/:courseId/:assessmentId/edit/:id" component={GradingToolsEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/departments/create" component={DepartmentsEdit} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/departments/:facultyId" component={Departments} roles={Object.values(ROLES)}/>
                                <RestrictedRoute exact path="/departments/:facultyId/edit/:id" component={DepartmentsEdit} roles={[ROLES.ADMIN]}/>

                                <RestrictedRoute exact path="/users/import" render={() => <FileUpload fileType={FILE_UPLOAD.USER_FILE}/>} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/users/" component={Users} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/users/create" component={UserEdit} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/users/edit/:id" component={UserEdit} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/instructors/:departmentId" render={() => <Users userType={ROLES.INSTRUCTOR}/>} roles={[ROLES.ADMIN]}/>
                                <RestrictedRoute exact path="/students/:departmentId" render={() => <Users userType={ROLES.STUDENT}/>} roles={[ROLES.ADMIN]}/>

                                <Redirect to={"/"}/>
                            </Switch>
                        </Suspense>
                    </div>
                </CSSTransition>
              </TransitionGroup>
            </Base>
        )
    }
}

export default withRouter(Routes);