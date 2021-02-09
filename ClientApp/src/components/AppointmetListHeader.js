import React, {useState, useEffect} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'


const AppointmentListHeader = ({filterList}) => {

    const [filterValues, setFilterValues] = useState({ fltr_name: '', fltr_date: '' })

    useEffect(()=> {

        filterList(filterValues);

    },[filterValues])

    const filterByName = (e) => {
        setFilterValues({...filterValues, fltr_name: e.target.value.trim()});
    }
    
    const filterByDate = (e) => {
        setFilterValues({...filterValues, fltr_date: e.target.value.trim()});
    }

    return (
        <div>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="frmFilterList-firstName">
                        <Form.Control 
                            type="text" 
                            placeholder="Search by name"
                            autoComplete="off"
                            value={filterValues.fltr_name}
                            onChange={e => filterByName(e)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="frmFilterList-date">
                        <Form.Control 
                            type="text" 
                            autoComplete="off"
                            onFocus={(e) => { e.target.type="date"}}
                            placeholder="Search by date"
                            value={filterValues.fltr_date}
                            onChange={e => filterByDate(e)}
                        />
                    </Form.Group>

                    <Link to={{pathname:"/appt-create-edit", state:{appt: null}}} className="mx-3">
                        <Button variant="outline-primary">
                            BOOK
                        </Button>
                    </Link>

                </Form.Row>
            </Form>
        </div>
    );
}

export default AppointmentListHeader;