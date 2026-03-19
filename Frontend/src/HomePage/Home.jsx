import React from 'react'
import "./HomePage.css"
import Contact from '../Component/Contact/Contact'
import InstructionPage from '../Component/Instruction/Instruction'
import Courses from '../Component/CoursePage/Course'

export default function Home() {
    return (
        <>
        <section className="hm-hero">
            <p className="hm-hero-top">
                LEARN IT. GROW CAREER. BUILD THE FUTURE →
            </p>

            <h1 className="hm-hero-title">
                Grow smarter. Learn better. <br />
                Build the future.
            </h1>

            <p className="hm-hero-sub">
                From strong fundamentals to in-demand IT skills, <br />
                Growall Coaching prepares you for what’s next.
            </p>

            <div className="hm-button-context">
                <button className="hm-hero-btn">
                    Start your journey →
                </button>
            </div>
        </section>
        <Courses/>
        <InstructionPage/>
        <Contact/>
        
        </>

    )
}
