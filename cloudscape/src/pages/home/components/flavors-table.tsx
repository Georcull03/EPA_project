// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

import { useCollection } from '@cloudscape-design/collection-hooks';
import CollectionPreferences, {
    CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import Table, { TableProps } from '@cloudscape-design/components/table';

import { Questions } from '../data';
import { TextFilter } from '@cloudscape-design/components';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

const getFilterCounterText = (count = 0) => `${count} ${count === 1 ? 'match' : 'matches'}`;
const getHeaderCounterText = (items: readonly Questions[] = [], selectedItems: readonly Questions[] = []) => {
    return selectedItems && selectedItems.length > 0 ? `(${selectedItems.length}/${items.length})` : `(${items.length})`;
};

const columnDefinitions: TableProps<Questions>['columnDefinitions'] = [
    {
        header: 'Level',
        cell: ({ level }) => level,
        sortingField: 'level',
        minWidth: 175,
    },
    {
        header: 'Question',
        cell: ({ question }) => question,
        sortingField: 'question',
        minWidth: 160,
    },
    {
        header: 'Answer',
        cell: ({ Answer }) => Answer,
        sortingField: 'answer',
        minWidth: 160,
    },
    {
        header: 'Manager/IC',
        cell: ({ ManagerIC }) => ManagerIC,
        sortingField: 'manager/ic',
        minWidth: 150,
    },
    {
        header: 'Role',
        cell: ({ Role }) => Role,
        sortingField: 'role',
        minWidth: 160,
    },
];

const EmptyState = ({ title, subtitle, action }: { title: string; subtitle: string; action: ReactNode }) => {
    return (
        <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
                {title}
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                {subtitle}
            </Box>
            {action}
        </Box>
    );
};

export default function VariationTable() {
    const [data, setData] = useState<Questions[]>([]);
    const [preferences, setPreferences] = useState<CollectionPreferencesProps['preferences']>({ pageSize: 20 });

    useEffect(() => {
        // Fetch data from the API gateway URL
        axios.get('https://api.cullenge.people.aws.dev/question')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const { items, filterProps, actions, filteredItemsCount, paginationProps, collectionProps } = useCollection<Questions>(
        data,
        {
            filtering: {
                noMatch: (
                    <EmptyState
                        title="No matches"
                        subtitle="We can’t find a question that matches that criteria."
                        action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>}
                    />
                ),
                empty: (
                    <EmptyState title="No Questions" subtitle="No questions to display." action={<Button>Enter Question</Button>} />
                ),
            },
            pagination: { pageSize: preferences?.pageSize },
            sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
            selection: {},
        }
    );

    return (
        <Table<Questions>
            {...collectionProps}
            items={items}
            columnDefinitions={columnDefinitions}
            stickyHeader={true}
            resizableColumns={true}
            variant="full-page"
            selectionType="single"
            ariaLabels={{
                selectionGroupLabel: 'Items selection',
                itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(i => i.level === item.level).length;
                    return `${item.level} is ${isItemSelected ? '' : 'not '}selected`;
                },
                tableLabel: 'Questions table',
            }}
            header={
                <Header
                    variant="awsui-h1-sticky"
                    counter={getHeaderCounterText(data, collectionProps.selectedItems)}
                    actions={
                        <SpaceBetween size="xs" direction="horizontal">
                            <Button disabled={collectionProps.selectedItems?.length === 0}>Edit</Button>
                            <Button href="/create-flavor/index.html" variant="primary">
                                Enter question
                            </Button>
                        </SpaceBetween>
                    }
                >
                    Questions
                </Header>
            }
            pagination={<Pagination {...paginationProps} />}
            filter={
                <TextFilter
                    {...filterProps}
                    filteringPlaceholder="Find flavors"
                    countText={getFilterCounterText(filteredItemsCount)}
                />
            }
            preferences={
                <CollectionPreferences
                    preferences={preferences}
                    pageSizePreference={{
                        title: 'Select page size',
                        options: [
                            { value: 10, label: '10 resources' },
                            { value: 20, label: '20 resources' },
                            { value: 50, label: '50 resources' },
                            { value: 100, label: '100 resources' },
                        ],
                    }}
                    onConfirm={({ detail }) => setPreferences(detail)}
                    title="Preferences"
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                />
            }
        />
    );
}
