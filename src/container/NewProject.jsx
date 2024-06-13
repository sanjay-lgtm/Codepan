import React from 'react'
import { FaHtml5 } from 'react-icons/fa'
import Split from 'react-split'
const NewProject = () => {
    return (
        <>
            <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>
                {/* alert section  */ }

                {/* header section  */ }


                {/* coding section  */ }
                <div>
                    {/* horizontal */ }
                    {/* <Split className="h-[calc(100vh-94px)]"
                        direction="horizontal"
                        sizes={ [60, 40] }
                        minSize={ 60 }>
                        <div></div>
                        <div></div>
                    </Split> */}
                    <Split
                        sizes={ [25, 75] }
                        minSize={ 100 }
                        expandToMin={ false }
                        gutterSize={ 10 }
                        gutterAlign="center"
                        snapOffset={ 30 }
                        dragInterval={ 1 }
                        direction="horizontal"
                        cursor="col-resize"
                    >
                        <Split direction="vertical" minSize={ 500 }>
                            <div className='w-full h-full flex flex-col items-start justify-start'>
                                <div className='w-full flex items-center justify-between'>
                                    <div>
                                        <FaHtml5/>
                                        <p>HTML5</p>
                                    </div>
                                </div>
                                <div>
                                    codemirror
                                </div>
                            </div>
                            <Split direction="vertical" minSize={ 500 }>

                            </Split>
                        </Split>
                        <ComponentB />
                    </Split>

                    {/* top section  */ }

                    {/* bottom result section  */ }
                </div>
            </div>

        </>
    )
}

export default NewProject
