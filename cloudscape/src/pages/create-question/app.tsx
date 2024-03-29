// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, {useEffect, useState} from 'react';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ContentLayout from '@cloudscape-design/components/content-layout';
import FormField from '@cloudscape-design/components/form-field';
import Container from '@cloudscape-design/components/container';
import Input from '@cloudscape-design/components/input'
import Flashbar from "@cloudscape-design/components/flashbar";

import Breadcrumbs from '../../components/breadcrumbs';
import Navigation from '../../components/navigation';
import ShellLayout from '../../layouts/shell';
import {createApiPath} from "../../utils/helpers";

const isEmptyString = (value: string) => !value?.length;
export default function App() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [level, setLevel] = useState('');
    const [question, setQuestion] = useState('');
    const [Answer, setAnswer] = useState('');
    const [ManagerIC, setManagerIC] = useState('');
    const [Role, setRole] = useState('');
    const [flashbar, setFlashbar] = useState<any>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const url = createApiPath()

        const apiUrl = url + '/put-question';

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    level,
                    question,
                    Answer,
                    ManagerIC,
                    Role,
                }),
            });

            console.log(response);

            if (response.ok) {
                console.log('PUT request successful');
                setFlashbar([{
                    type: "success",
                    content: "Success! Interview question uploaded. Click View Questions to view all questions",
                    action: <Button onClick={handleClick} variant="link">View Questions</Button>,
                    dismissible: true,
                    dismissLabel: "Dismiss",
                    onDismiss: () => setFlashbar([]),
                    id: "success_message"
                }])
            } else {
                console.error('PUT request failed');
                setFlashbar([{
                    type: "error",
                    header: "Failed to create question",
                    content: "Please try again",
                    dismissible: true,
                    dismissLabel: "Dismiss",
                    onDismiss: () => setFlashbar([]),
                    id: "error_message"
                }])
            }
        } catch (error) {
            console.error('Error during PUT request:', error);
        }

        setIsFormSubmitted(true);
    };

    const handleClick = () => {
        if (level != '' && question != '' && Answer != '' && ManagerIC != '' && Role != '') {
            location.pathname = "home/index.html"
        }
    }

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const queryParams = Object.fromEntries(urlSearchParams.entries());

        if (queryParams.editMode === 'true' && Object.keys(queryParams).length > 1) {
            setLevel(queryParams.level || '');
            setQuestion(queryParams.question || '');
            setAnswer(queryParams.Answer || '');
            setManagerIC(queryParams.ManagerIC || '');
            setRole(queryParams.Role || '');
        }
    }, []);

    return (
        <ShellLayout
            contentType="form"
            breadcrumbs={<Breadcrumbs active={{text: 'Create question', href: 'index.html'}}/>}
            navigation={<Navigation/>}
            tools={<HelpPanel header={<h2>Help panel
                <div>
                    <p>
                        This is the page where you create your questions!
                        Make sure you fill out every field otherwise your question won't be submitted and you will
                        see some nasty red fields pop up.
                    </p>

                    <h3>The fields</h3>
                    <ul>
                        <li>Level</li>
                        <li>Question</li>
                        <li>Answer</li>
                        <li>Manager/IC</li>
                        <li>Role</li>
                    </ul>

                    <h4>Fields explained</h4>
                    <p>
                        <li>Level - the level this question should be asked for.</li>
                        <li>Question - Your brilliant question that others will use.</li>
                        <li>Answer - Your answer to your brilliant question.</li>
                        <li>Manager/IC - Is this for a Manager or an IC.</li>
                        <li>Role - What Role should this question be aimed at.</li>
                    </p>
                </div>
            </h2>}/>}
        >
            <ContentLayout
                header={
                    <Header
                        variant="h1"
                        description="Enter your interview questions, so that others can use them!"
                    >
                        Create question
                    </Header>
                }
            >
                <form
                    onSubmit={handleSubmit}
                >
                    <Form
                        actions={
                            <SpaceBetween direction="horizontal" size="xs">
                                <Button href="/home/index.html" variant="link">
                                    Return
                                </Button>
                                <Button formAction="submit" variant="primary">
                                    Create Question
                                </Button>
                            </SpaceBetween>
                        }
                    >
                        <SpaceBetween size="l">
                            <Flashbar items={flashbar} stackItems={true}/>
                            <Container
                                header={
                                    <Header variant="h2">
                                        Form container header
                                    </Header>
                                }
                            >
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="Level"
                                               errorText={isFormSubmitted && isEmptyString(level) && 'Level is required.'}
                                               i18nStrings={{
                                                   errorIconAriaLabel: 'Error',
                                               }}
                                    >
                                        <Input
                                            value={level}
                                            onChange={({detail}) => setLevel(detail.value)}
                                            type="text"
                                        />
                                    </FormField>
                                    <FormField label="Question"
                                               errorText={isFormSubmitted && isEmptyString(question) && 'Question is required.'}
                                               i18nStrings={{
                                                   errorIconAriaLabel: 'Error',
                                               }}
                                    >
                                        <Input
                                            value={question}
                                            onChange={({detail}) => setQuestion(detail.value)}
                                            type="text"
                                        />
                                    </FormField>
                                    <FormField label="Answer"
                                               errorText={isFormSubmitted && isEmptyString(Answer) && 'Answer is required.'}
                                               i18nStrings={{
                                                   errorIconAriaLabel: 'Error',
                                               }}
                                    >
                                        <Input
                                            value={Answer}
                                            onChange={({detail}) => setAnswer(detail.value)}
                                            type="text"
                                        />
                                    </FormField>
                                    <FormField label="Manager/IC"
                                               errorText={isFormSubmitted && isEmptyString(ManagerIC) && 'Manager/IC is required.'}
                                               i18nStrings={{
                                                   errorIconAriaLabel: 'Error',
                                               }}
                                    >
                                        <Input
                                            value={ManagerIC}
                                            onChange={({detail}) => setManagerIC(detail.value)}
                                            type="text"
                                        />
                                    </FormField>
                                    <FormField label="Role"
                                               errorText={isFormSubmitted && isEmptyString(Role) && 'Role is required.'}
                                               i18nStrings={{
                                                   errorIconAriaLabel: 'Error',
                                               }}
                                    >
                                        <Input
                                            value={Role}
                                            onChange={({detail}) => setRole(detail.value)}
                                            type="text"
                                        />
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        </SpaceBetween>
                    </Form>
                </form>
            </ContentLayout>
        </ShellLayout>
    );
}
