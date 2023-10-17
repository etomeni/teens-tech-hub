import styles from './../src/Components/styles.module.css'
import Link from 'next/link'

const NotFound = () => {
  return (
    <main className={`${ styles.notFound }`}>

        <main className="my-5 py-5">
            <section className={`${ styles.wrapperOutter } container`}>
                <div className={`${ styles.rowzz } row`}>
                    <div className={`${ styles.yCenter } col-12`}>
                        <div className={`${ styles.wrapperInner }`}>
                            <div className="text-center">
                            <h1 style={{ fontSize: 'xx-large', margin: 0, padding: 0 }}>
                                Error <span style={{ color: '#de2341' }}>404! </span>
                            </h1>
                        
                            <img src="assets/images/error404.gif" />
                        
                            <h3>Page <span style={{ color: '#de2341' }}>Not</span> Found!!!</h3>
                        
                            <Link href="/">
                                <button className="btn btn-danger">
                                    <i className="bi bi-home"></i>
                                    Home
                                </button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    </main>
  )
}

export default NotFound