import React from 'react';
import './styles.css'
// https://github.com/elementary/website/blob/fd35110fbdef132a50473b739e3ba76c996064e2/index.php
const About = () => {
    return(
    <div >
        <div class="home-banner" >
            <div class="row">
                <div class="columns small-12" style={{marginTop:'100px'}} >
                    <h1>CI/CD service for Windows, Linux and macOS</h1>
                    <h2>Build, test, deploy your apps faster, on any platform.</h2>

                    <div class="row">
                        <div class="columns medium-12">
                            <div class="buttons">
                                <a href="https://ci.appveyor.com/signup" class="big-button">Create your FREE account now</a>
                            </div>
                            <div class="on-premise">
                                Interested in self-hosted AppVeyor? <a href="/self-hosted/">Download AppVeyor Server</a>.
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="columns medium-6">
                            <ul class="highlights">
                                <li>Start in minutes</li>
                                <li>Works with any source control</li>
                                <li>Fast build VMs with admin/sudo access</li>
                                <li>Multi stage deployments</li>
                                <li>Windows, Linux and macOS support</li>
                            </ul>
                        </div>
                        <div class="columns medium-6">
                            <img src="../../assets/img/home/appveyor-home-screenshot@2x.png" alt="AppVeyor Screenshot" width="500" height="363"/>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
        <div class="customers-container">
            <div class="row">
                <div class="columns small-12">
                    <h2>Our great customers</h2>
                </div>
            </div>

            <div class="row logos">
                <div class="columns small-12">
                    <span class="customer-logo microsoft"></span>
                    <span class="customer-logo google"></span>
                    <span class="customer-logo netflix"></span>
                    <span class="customer-logo slack"></span>
                </div>
            </div>

            <div class="row logos">
                <div class="columns small-12">
                    <span class="customer-logo github"></span>
                    <span class="customer-logo atlassian"></span>
                    <span class="customer-logo mozilla"></span>
                    <span class="customer-logo facebook"></span>
                    <span class="customer-logo nasa"></span>
                </div>
            </div>

        </div>
            <div class="features-container">
                <div class="row">
                    <div class="columns medium-4 feature">
                        <h3>100,000+</h3>
                        <p>
                            Developers use AppVeyor
                        </p>
                    </div>
                    <div class="columns medium-4 feature">
                        <h3>40,000,000+</h3>
                        <p>
                            Builds run
                        </p>
                    </div>
                    <div class="columns medium-4 feature">
                        <h3>2,500,000+</h3>
                        <p>
                            Applications deployed
                        </p>
                    </div>
                </div>
            </div>

            <div class="benefits-container">
            <div class="row">
                <div class="columns small-12">
                    <h2>AppVeyor features</h2>
                </div>
            </div>

            <div class="benefits-table">
                <div class="row">
                    <div class="columns medium-10 medium-push-2">
                        <div class="benefit {{ benefit.class }}">
                            Support for GitHub, GitHub Enterprise, Bitbucket, GitLab, Azure Repos, Kiln, Gitea or custom repos
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="columns small-12">

                    <p class="bottom-action-buttons">
                        <a href="https://ci.appveyor.com/signup" class="big-button">Create your free account now</a>
                    </p>

                </div>
            </div>

    </div>  
    </div>  
)};


export default About;