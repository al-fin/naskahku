import React from 'react';
import Navigation from './Navigation';
import {Naskah, ContentNaskah, TypeElemen} from '../../interfaces/naskah'
import {useHistory} from 'react-router-dom'
import NavigationBottom from './NavigationBottom';
import db from '../../services/db';
import shortid from 'shortid';
import NaskahMenu from '../share/NaskahMenu';
import {useAppDispatch} from '../../contexts/app-context';
import Input from './Input';
import EditDialog from './EditDialog';

export default function Editor() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [naskah, setNaskah] = React.useState<Naskah>(JSON.parse(sessionStorage.getItem('naskah_active') || '{}'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  

  const deleteNaskah = () => {
    closeMenu()
    db.table('naskah').where('id').equals(naskah.id).delete().then(res => {
      history.replace('/')
      // error alert
      dispatch({
        type: 'SET_ALERT',
        alert: {
          open: true,
          variant: 'success',
          message: 'Naskah berhasil dihapus!',
          duration: 6000
        }
      })

    }).catch(err => {
      dispatch({
        type: 'SET_ALERT',
        alert: {
          open: true,
          variant: 'error',
          message: 'Gagal menghapus naskah!',
          duration: 6000
        }
      })
    })
  }



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    closeMenu()
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [inputs, setInputs] = React.useState<ContentNaskah[]>(naskah.content || []);
  const [contentActive, setContentActive] = React.useState<ContentNaskah>(inputs[0]);
  const [lastElemen, setLastElemen] = React.useState<TypeElemen>('GENERAL')
  const handleInputChange = (value: string, index: number) => {
    let newInputs = inputs
    newInputs[index].text = value
    setInputs([...newInputs])
  }

  React.useEffect(() => {
    if (Object.keys(naskah).length === 0 && naskah.constructor === Object) {
      history.replace('/')
    }
  }, [])

  React.useEffect(() => {
  }, [inputs])  

  const autoSave = () => {
    // auto save
    const now = new Date().getTime()
    db.table('naskah').update(naskah.id, {
      content: inputs,
      updatedAt: now
    });
  }

  const toggleLock = () => {
    const stateLock = !naskah.lock;
    db.table('naskah').update(naskah.id, {
      lock: stateLock
    }).then(res => {
      setNaskah({
        ...naskah,
        lock: stateLock
      })
      sessionStorage.setItem('naskah_active', JSON.stringify({
        ...naskah,
        lock: stateLock
      }))
    })

  }

  const handleFocus = (e: any, c: ContentNaskah) => {
    setContentActive(c)
    // Custom set cursor on zero text position in input text field
    if (c.elemen === 'PARENTHETICAL') {
      e.target.selectionStart = 1
      e.target.selectionEnd = 1
    } else {
      const len = e.target.value.length
      e.target.setSelectionRange(len, len);
    }
  }

  const changeElemen = (newElemen: TypeElemen) => {
    let newInputs = [...inputs]
    const index = findWithAttr(newInputs, 'id', contentActive.id);
    newInputs[index].elemen = newElemen;
    let text = newInputs[index].text || ''
    //---------------------------------------
    if (text[0] === '(' && text[text.length-1] === ')') {
      // remove ()
      text = newInputs[index].text || ''
      newInputs[index].text = text?.substring(1, text.length-1);
    }
    if (newInputs[index].text?.includes('CAST. ')) {
      text = newInputs[index].text || ''
      newInputs[index].text = text?.replace('CAST. ', '')
    }
    // --------------------------------------
    if (newElemen === 'PARENTHETICAL') {
      // add ()
      text = newInputs[index].text || ''
      newInputs[index].text = '('+text+')'
    }
    
    if (newElemen === 'CAST') {
      text = newInputs[index].text || ''
      newInputs[index].text = 'CAST. '+text
    }

    setInputs([...newInputs])
  }

  const handleNext = () => {
    let newInputs = [...inputs]
    const index = findWithAttr(newInputs, 'id', contentActive.id);
    const next = nextElemen(contentActive!.elemen)
    newInputs[index].elemen = next;
    let text = newInputs[index].text || ''
    //---------------------------------------
    if (text[0] === '(' && text[text.length-1] === ')') {
      // remove ()
      text = newInputs[index].text || ''
      newInputs[index].text = text?.substring(1, text.length-1);
    }
    if (newInputs[index].text?.includes('CAST. ')) {
      text = newInputs[index].text || ''
      newInputs[index].text = text?.replace('CAST. ', '')
    }
    // --------------------------------------
    if (next === 'PARENTHETICAL') {
      // add ()
      text = newInputs[index].text || ''
      newInputs[index].text = '('+text+')'
    }
    
    if (next === 'CAST') {
      text = newInputs[index].text || ''
      newInputs[index].text = 'CAST. '+text
    }
    setInputs([...newInputs])
  }
  const handlePrev = () => {
    let newInputs = [...inputs]
    const index = findWithAttr(inputs, 'id', contentActive.id);
    newInputs[index].elemen = lastElemen
    let text = newInputs[index].text || ''
    //---------------------------------------
    if (text[0] === '(' && text[text.length-1] === ')') {
      // remove ()
      text = newInputs[index].text || ''
      newInputs[index].text = text?.substring(1, text.length-1);
    }
    if (newInputs[index].text?.includes('CAST. ')) {
      text = newInputs[index].text || ''
      newInputs[index].text = text?.replace('CAST. ', '')
    }
    // --------------------------------------
    if (lastElemen === 'PARENTHETICAL') {
      // add ()
      text = newInputs[index].text || ''
      newInputs[index].text = '('+text+')'
    }
    
    if (lastElemen === 'CAST') {
      text = newInputs[index].text || ''
      newInputs[index].text = 'CAST. '+text
    }
    setInputs([...newInputs])

  }


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      let newInputs = [...inputs]
      const index = findWithAttr(newInputs, 'id', contentActive.id);
      const next = nextElemen(contentActive!.elemen)
      setContentActive(inputs[index])
      if (next === 'PARENTHETICAL') {
        newInputs.splice(index+1, 0, {
          id: shortid.generate(),
          elemen: next,
          text: '()'
        })
      } else if (next === 'CAST') {
        newInputs.splice(index+1, 0, {
          id: shortid.generate(),
          elemen: next,
          text: 'CAST. '
        })
      } else {
        newInputs.splice(index+1, 0, {
          id: shortid.generate(),
          elemen: next,
          text: ''
        })
      }
      setInputs([...newInputs])
    }
    if ((e.keyCode === 8 || e.keyCode === 46)) {
      let newInputs = [...inputs]
      const index = findWithAttr(newInputs, 'id', contentActive.id);
      if (inputs[index].text === '' && inputs.length >= 2) {
        e.preventDefault()
        
        // delete input
        newInputs.splice(index, 1);
        setInputs([...newInputs])
        document.getElementById(String(inputs[index-1]?.id))?.focus()
      }


    }


  }

  function nextElemen(elemen: TypeElemen): TypeElemen {
    setLastElemen(elemen)
    switch (elemen) {
      case 'ACTION':
        return 'CHARACTER';
      case 'CAST':
        return 'SHOT';
      case 'CHARACTER':
        return 'DIALOG';
      case 'DIALOG':
        return 'PARENTHETICAL';
      case 'GENERAL':
        return 'HEADSCENE';
      case 'HEADSCENE':
        return 'CAST';
      case 'PARENTHETICAL':
        return 'CHARACTER';
      case 'SHOT':
        return 'ACTION';
      case 'TRANSITION':
        return 'HEADSCENE';
      default:
        return 'GENERAL'
    }
  }

	function findWithAttr(array: any, attr: any, value: any) {
		for (var i = 0; i < array.length; i += 1) {
			if (array[i][attr] === value) {
				return i;
			}
		}
		return -1;
  }
  const downloadProject = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(naskah)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = naskah.judul+".nk";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    closeMenu()
  }



  return (
    <>
      <Navigation naskah={naskah} toggleLock={toggleLock} openMenu={openMenu} />
      <NaskahMenu naskah={naskah} download={downloadProject} anchorEl={anchorEl} closeMenu={closeMenu} handleClickOpen={handleClickOpen} deleteNaskah={deleteNaskah} />
      {/* <NaskahMenu anchorEl={anchorEl} closeMenu={closeMenu} handleClickOpen={handleClickOpen} deleteNaskah={deleteNaskah} /> */}
      <EditDialog setNaskah={setNaskah} naskah={naskah} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      <br />
      <Input elemen={'TITLE'} value={naskah.judul} disabled />
      <Input elemen={'TITLE'} value={`(${naskah.produksi})`} disabled />
      <Input elemen={'PENULIS'} value={`By ${naskah.penulis}`} disabled />
      { inputs.map((c: ContentNaskah, k: number) => (
        <>
        <Input disabled={naskah.lock} active={contentActive.id === c.id && !naskah.lock} id={c.id} autoFocus={(inputs.length === 1 || k === findWithAttr(inputs, 'id', contentActive.id)+1) } key={c.id} elemen={c.elemen} value={c.text} onKeyDown={handleKeyDown} onFocus={(e: any) => handleFocus(e, c)} onBlur={autoSave} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, k)} />
        </>
      )) }
      <br /><br /><br /><br /><br />
      {!naskah.lock && <NavigationBottom elemen={contentActive!.elemen} changeElemen={changeElemen} prev={handlePrev} next={handleNext} />}
    </>
  )
}

