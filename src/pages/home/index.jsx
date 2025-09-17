import React from 'react'
import { Col1, Col2, Row, Styled } from './styled'
import { FaFacebook, FaGithub, FaLinkedin, FaPhoneAlt, FaUser, FaYoutube } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import IndianFlag from '../../components/IndianFlag'
import { TbWorldWww } from 'react-icons/tb'

const Home = () => {


    return (
        <>
            <Styled.Wrapper>
                <h3>Personal Finance Dashboard - last updated: Sep 17, 2025</h3>

                <fieldset>
                    <legend>About Project</legend>
                    <div className='para'>
                        Personal Finance Dashboard is a fast, privacy-first budgeting app built with React + styled-components. Plan envelopes, track transactions, visualize spend, and import/export CSV-all offline, no backend, your data stays on your device.
                    </div>
                    <div className="points">
                        <ul className='mainList'>
                            <li className='listBlock'>
                                <h2 className='heading'>What this is</h2>
                                <ul>
                                    <li>A fast, frontend-only personal finance dashboard built with React + styled-components.</li>
                                    <li>Privacy-first: no backend; all data lives in your browser’s localStorage.</li>
                                </ul>
                            </li>
                            <li className='listBlock'>
                                <h2 className='heading'>Core modules</h2>
                                <ul>
                                    <li>Overview: KPIs (Total Balance, Month Spend, Month Income, Net Cash Flow, Remaining Budget/Overspent) + charts.</li>
                                    <li>Transactions: add income/expense, view/filter/sort ledger, month navigation, totals, CSV export.</li>
                                </ul>
                            </li>
                            <li className='listBlock'>
                                <h2 className='heading'>Highlights</h2>
                                <ul>
                                    <li>Add transactions (account + optional envelope & note).</li>
                                    <li>Delete with Undo and Clear month with Undo (react-toastify).</li>
                                    <li>Search & filters: text search, type (income/expense), account, envelope.</li>
                                    <li>Column sorting: date / type / account / envelope / amount.</li>
                                    <li>Totals row: shows income, expense and net for current filters.</li>
                                    <li>Month navigation: prev/next + Month/Year selects (timezone-safe).</li>
                                    <li>Charts: daily Income vs Expense (area), Top spending categories (bar).</li>
                                    <li>Sticky table headers, responsive layout, keyboard-friendly modals.</li>
                                </ul>
                            </li>
                            <li className='listBlock'>
                                <h2 className='heading'>Data & logic</h2>
                                <ul>
                                    <li>Transactions use positive amounts for income and negative for expenses.</li>
                                    <li>KPIs are computed per selected month; Remaining Budget = Σ(envelope budgets) − month expense (can go negative = Overspent).</li>
                                    <li>Everything is persisted to localStorage; refresh-safe and works offline.</li>
                                </ul>
                            </li>
                            <li className='listBlock'>
                                <h2 className='heading'>Tech stack</h2>
                                <ul>
                                    <li>React 18, Vite, styled-components, React Router 6</li>
                                    <li>Recharts (charts), react-toastify (toasts), react-icons (icons)</li>
                                </ul>
                            </li>
                            <li className='listBlock'>
                                <h2 className='heading'>CSV</h2>
                                <ul>
                                    <li>Export transactions for the selected month (one click).</li>
                                    <li>(Import planned in roadmap.)</li>
                                </ul>
                            </li>
                            <li className='listBlock'>
                                <h2 className='heading'>Deployment</h2>
                                <ul>
                                    <li>Optimized for GitHub Pages; router uses a base path for clean deep links.</li>
                                </ul>
                            </li>
                            <li className='listBlock'>
                                <h2 className='heading'>Roadmap (next)</h2>
                                <ul>
                                    <li>CSV import with preview/mapping</li>
                                    <li>Transfers and account balances timeline</li>
                                    <li>Envelope funding & carryover options</li>
                                    <li>Settings (currency/locale, theme), Backup/Restore JSON</li>
                                    <li>Virtualized ledger for very large datasets</li>
                                </ul>
                            </li>
                            <li className='listBlock'>
                                <h2 className='heading'>How to start</h2>
                                <ul>
                                    <li>Pick a month → Add Transaction → explore filters/sort → view KPIs & charts → Export CSV if needed.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>About Developer</legend>
                    <div className='aboutDeveloper'>
                        <Row>
                            <Col1>Name</Col1>
                            <Col2>
                                Ashish Ranjan
                                <div className="icon"><FaUser size={20} /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>Phone</Col1>
                            <Col2>
                                <a
                                    href="tel:+918123747965"
                                >+91 8123747965</a>
                                <div className="icon"><FaPhoneAlt size={20} /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>Email</Col1>
                            <Col2>
                                <a
                                    href="mailto:ash.ranjan09@gmail.com"
                                >ash.ranjan09@gmail.com</a>
                                <div className="icon"><MdEmail size={20} /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>Nationality</Col1>
                            <Col2>
                                The Republic of India
                                <div className="icon"><IndianFlag /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>Website</Col1>
                            <Col2>
                                <a
                                    href="https://www.ashishranjan.net/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://www.ashishranjan.net/</a>
                                <div className="icon"><TbWorldWww size={20} /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>Old Website</Col1>
                            <Col2>
                                <a
                                    href="http://www.ashishranjan.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >http://www.ashishranjan.in/</a>
                                <div className="icon"><TbWorldWww size={20} /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>Facebook</Col1>
                            <Col2>
                                <a
                                    href="https://www.facebook.com/theash.ashish/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://www.facebook.com/theash.ashish/</a>
                                <div className="icon"><FaFacebook size={20} /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>LinkedIn</Col1>
                            <Col2>
                                <a
                                    href="https://www.linkedin.com/in/aashishranjan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://www.linkedin.com/in/aashishranjan/</a>
                                <div className="icon"><FaLinkedin size={20} /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>YouTube</Col1>
                            <Col2>
                                <a
                                    href="https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ</a>
                                <div className="icon"><FaYoutube size={20} /></div>
                            </Col2>
                        </Row>
                        <Row>
                            <Col1>GitHub</Col1>
                            <Col2>
                                <a
                                    href="https://github.com/a2rp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://github.com/a2rp</a>
                                <div className="icon"><FaGithub size={20} /></div>
                            </Col2>
                        </Row>
                    </div>
                </fieldset>
            </Styled.Wrapper>
        </>
    )
}

export default Home

