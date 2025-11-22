import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

// ---------- DATOS LOCALES (no API) ----------
const customersData = [
    {
        id: 1000,
        name: "James Butt",
        country: { name: "Algeria", code: "dz" },
        date: "2015-09-13",
        status: "unqualified",
        verified: true,
        representative: { name: "Amy Elsner", image: "amyelsner.png" }
    },
    {
        id: 1001,
        name: "Josephine Darakjy",
        country: { name: "Egypt", code: "eg" },
        date: "2019-02-09",
        status: "qualified",
        verified: false,
        representative: { name: "Anna Fali", image: "annafali.png" }
    },
    {
        id: 1002,
        name: "Art Venere",
        country: { name: "Panama", code: "pa" },
        date: "2017-05-13",
        status: "new",
        verified: true,
        representative: { name: "Asiya Javayant", image: "asiyajavayant.png" }
    },
    {
        id: 1003,
        name: "Lenna Paprocki",
        country: { name: "Slovenia", code: "si" },
        date: "2020-09-15",
        status: "negotiation",
        verified: true,
        representative: { name: "Bernardo Dominic", image: "bernardodominic.png" }
    },
    {
        id: 1004,
        name: "Donette Foller",
        country: { name: "South Africa", code: "za" },
        date: "2016-06-01",
        status: "renewal",
        verified: false,
        representative: { name: "Elwin Sharvill", image: "elwinsharvill.png" }
    }
];

export default function FilterTable() {
    const [customers, setCustomers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' }
    ];

    const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal'];

    useEffect(() => {
        // Simula cargar datos
        setTimeout(() => {
            setCustomers(
                customersData.map((d) => ({
                    ...d,
                    date: new Date(d.date)
                }))
            );
            setLoading(false);
        }, 500);
    }, []);

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';
            case 'qualified':
                return 'success';
            case 'new':
                return 'info';
            case 'negotiation':
                return 'warning';
            case 'renewal':
                return null;
            default:
                return null;
        }
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { ...prevFilters.global, value }
        }));
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className="flex justify-content-end">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Keyword Search"
                />
            </IconField>
        </div>
    );

    const countryBodyTemplate = (rowData) => (
        <div className="flex align-items-center gap-2">
            <img
                alt="flag"
                src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                className={`flag flag-${rowData.country.code}`}
                style={{ width: '24px' }}
            />
            <span>{rowData.country.name}</span>
        </div>
    );

    const representativeBodyTemplate = (rowData) => (
        <div className="flex align-items-center gap-2">
            <img
                alt={rowData.representative.name}
                src={`https://primefaces.org/cdn/primereact/images/avatar/${rowData.representative.image}`}
                width="32"
            />
            <span>{rowData.representative.name}</span>
        </div>
    );

    const representativesItemTemplate = (option) => (
        <div className="flex align-items-center gap-2">
            <img
                alt={option.name}
                src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
                width="32"
            />
            <span>{option.name}</span>
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );

    const statusItemTemplate = (option) => (
        <Tag value={option} severity={getSeverity(option)} />
    );

    const verifiedBodyTemplate = (rowData) => (
        <i
            className={classNames('pi', {
                'true-icon pi-check-circle': rowData.verified,
                'false-icon pi-times-circle': !rowData.verified
            })}
        ></i>
    );

    const representativeRowFilterTemplate = (options) => (
        <MultiSelect
            value={options.value}
            options={representatives}
            itemTemplate={representativesItemTemplate}
            onChange={(e) => options.filterApplyCallback(e.value)}
            optionLabel="name"
            placeholder="Any"
            className="p-column-filter"
            maxSelectedLabels={1}
            style={{ minWidth: '14rem' }}
        />
    );

    const statusRowFilterTemplate = (options) => (
        <Dropdown
            value={options.value}
            options={statuses}
            onChange={(e) => options.filterApplyCallback(e.value)}
            itemTemplate={statusItemTemplate}
            placeholder="Select One"
            className="p-column-filter"
            showClear
            style={{ minWidth: '12rem' }}
        />
    );

    const verifiedRowFilterTemplate = (options) => (
        <TriStateCheckbox
            value={options.value}
            onChange={(e) => options.filterApplyCallback(e.value)}
        />
    );

    return (
        <div className="card">
            <DataTable
                value={customers}
                paginator
                rows={10}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                loading={loading}
                globalFilterFields={[
                    'name',
                    'country.name',
                    'representative.name',
                    'status'
                ]}
                header={renderHeader()}
                emptyMessage="No customers found."
            >
                <Column field="name" header="Name" filter style={{ minWidth: '12rem' }} />
                <Column
                    header="Country"
                    filterField="country.name"
                    style={{ minWidth: '12rem' }}
                    body={countryBodyTemplate}
                    filter
                />
                <Column
                    header="Agent"
                    filterField="representative"
                    showFilterMenu={false}
                    style={{ minWidth: '14rem' }}
                    body={representativeBodyTemplate}
                    filter
                    filterElement={representativeRowFilterTemplate}
                />
                <Column
                    field="status"
                    header="Status"
                    showFilterMenu={false}
                    style={{ minWidth: '12rem' }}
                    body={statusBodyTemplate}
                    filter
                    filterElement={statusRowFilterTemplate}
                />
                <Column
                    field="verified"
                    header="Verified"
                    dataType="boolean"
                    style={{ minWidth: '6rem' }}
                    body={verifiedBodyTemplate}
                    filter
                    filterElement={verifiedRowFilterTemplate}
                />
            </DataTable>
        </div>
    );
}
