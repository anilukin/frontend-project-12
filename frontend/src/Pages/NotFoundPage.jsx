import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <section className='page_404'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 '>
            <div className='col-sm-10 col-sm-offset-1 text-center'>
              <div className='four_zero_four_bg'>
                <h1 className='text-center'>{t('notFoundPage.notFoundPageTitle')}</h1>
              </div>
              <div className='contant_box_404'>
                <h3>{t('notFoundPage.notFoundTitle')}</h3>
                <p>{t('notFoundPage.notFoundDescription')}</p>
                <button className='buttonLink_404'>
                  <Link to='/'>{t('notFoundPage.goHome')}</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
