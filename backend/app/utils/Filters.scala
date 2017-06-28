package utils

import javax.inject.Inject

import play.api.http.HttpFilters
import play.api.mvc.EssentialFilter
import play.filters.headers.SecurityHeadersFilter

/**
 * Provides filters.
 */
class Filters @Inject() (securityHeadersFilter: SecurityHeadersFilter) extends HttpFilters {
  override def filters: Seq[EssentialFilter] = Seq(securityHeadersFilter)
}