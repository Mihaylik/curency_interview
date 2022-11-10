import React, { createRef, FC, useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { store } from "./utils/store";

export const Convertor: FC = () => {
    const [firstAmount, setFirstAmount] = useState('1')
    const [secAmount, setSecAmount] = useState('1')
    const [firstValet, setFirstValet] = useState('UAH')
    const [secValet, setSecValet] = useState('UAH')
    const fromInputRef = createRef<HTMLInputElement>()
    const toInputRef = createRef<HTMLInputElement>()
    const courses = store.courses
    
    const changeAmount = (dispatch: React.Dispatch<React.SetStateAction<string>>, amount: string, from: string, to: string) =>{
        
        if(from == 'USD' && to == 'UAH')
            dispatch((parseInt(amount) * courses.USDtoUAH).toFixed(3))
        else if(from == 'EUR' && to == 'UAH')
            dispatch((parseInt(amount) * courses.EURtoUAH).toFixed(3))
        else if(from == 'USD' && to == 'EUR')
            dispatch((parseInt(amount) * courses.USDtoEUR).toFixed(3))
        else if(from == 'EUR' && to == 'USD')
            dispatch((parseInt(amount) / courses.USDtoEUR).toFixed(3))
        else if(from == 'UAH' && to == 'EUR')
            dispatch((parseInt(amount) / courses.EURtoUAH).toFixed(3))
        else if(from == 'UAH' && to == 'USD')
            dispatch((parseInt(amount) / courses.USDtoUAH).toFixed(3))
        else
            dispatch(parseInt(amount).toString())
    }

    useEffect(()=>{
        console.log({
            firstAmount,
            secAmount,
            from: firstValet,
            to: secValet,
            courses
        })
    })

    const fromInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setFirstAmount(fromInputRef.current!.value)
        if(value){
            changeAmount(setSecAmount, value, firstValet,  secValet)
        }
    }

    const toInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setSecAmount(toInputRef.current!.value)
        if(value){
            changeAmount(setFirstAmount, e.currentTarget.value, secValet, firstValet)
        }
            
    }

    const fromSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        if(firstAmount){
            setFirstValet(e.target.value)
            changeAmount(setSecAmount, firstAmount, e.currentTarget.value, secValet)
        }
    }

    const toSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        if(secAmount){
            setSecValet(e.target.value)
            changeAmount(setFirstAmount, secAmount, e.currentTarget.value, firstValet)
        }
    }

  return (
    <>
      <Card body style={{ margin: "10px" }}>
        <Row>
          <Form.Group as={Col}>
            <InputGroup className="mb-3">
              <Form.Select onChange={fromSelectChange} >
                <option>UAH</option>
                <option>USD</option>
                <option>EUR</option>
              </Form.Select>
              <Form.Control
                placeholder="Amount"
                aria-label="Amount"
                aria-describedby="basic-addon1"
                value={firstAmount}
                onInput={fromInputChange}
                ref={fromInputRef}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col}>
          <InputGroup className="mb-3">
              <Form.Select onChange={toSelectChange}>
                <option>UAH</option>
                <option>USD</option>
                <option>EUR</option>
              </Form.Select>
              <Form.Control
                placeholder="Amount"
                aria-label="Amount"
                aria-describedby="basic-addon1"
                value={secAmount}
                onInput={toInputChange}
                ref={toInputRef}
              />
            </InputGroup>
          </Form.Group>
        </Row>

      </Card>
    </>
  );
};
