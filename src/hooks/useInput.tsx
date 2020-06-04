import React from 'react';

const useInput: any = (initialValue: [] = []): any => {
  const [inputs, setInputs] = React.useState<any>(initialValue);

  const handleInputChange = (value: any, index: number) => {
    let newInputs = inputs
    newInputs[index].text = value
    setInputs(newInputs)
    console.log(inputs)
  }
  React.useEffect(() => {
    console.log('INPUTS HOOKS', inputs)
  }, [inputs]);

  return {
    inputs,
    handleInputChange,
  }
}

export default useInput;