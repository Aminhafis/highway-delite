import React, { useState, useEffect, useMemo } from "react";
import { getExperiences } from "../api/bookItApi";
import ExperienceCard from "../components/ExperienceCard";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Filter experiences based on search query
  const filteredExperiences = useMemo(() => {
    if (!searchQuery.trim()) return experiences;
    
    const query = searchQuery.toLowerCase();
    return experiences.filter((exp) => 
      exp.name.toLowerCase().includes(query) ||
      exp.location.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query)
    );
  }, [experiences, searchQuery]);

  const pageTitle = searchQuery 
    ? `Search results for "${searchQuery}" – Highway Delite` 
    : "Discover Amazing Experiences – Highway Delite";
  
  const pageDescription = searchQuery
    ? `Browse ${filteredExperiences.length} experiences matching "${searchQuery}"`
    : "Explore curated small-group experiences with certified guides. From kayaking to mountain trails, find your next adventure with Highway Delite.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={`${window.location.origin}${window.location.pathname}`} />
      </Helmet>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {searchQuery ? `Search Results` : 'Discover Experiences'}
              </h1>
              {searchQuery && (
                <p className="text-gray-600 mb-2">
                  Found <strong>{filteredExperiences.length}</strong> {filteredExperiences.length === 1 ? 'experience' : 'experiences'} matching "{searchQuery}"
                </p>
              )}
              <p className="text-gray-600 text-sm md:text-base">
                Curated small-group experiences with certified guides. Safety first, gear included.
              </p>
            </div>
          </div>
        </section> */}

        {/* Experiences Grid */}
        <section className="container mx-auto px-4 lg:px-6 py-8 md:py-12">
          {loading ? (
            <Loader text="Loading experiences..." />
          ) : filteredExperiences.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No experiences found</h2>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? `We couldn't find any experiences matching "${searchQuery}". Try a different search term.`
                    : "No experiences available at the moment. Check back soon!"}
                </p>
                {searchQuery && (
                  <a 
                    href="/" 
                    className="inline-block px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold text-sm transition-colors"
                  >
                    View All Experiences
                  </a>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredExperiences.map((exp) => (
                  <ExperienceCard key={exp._id} exp={exp} />
                ))}
              </div>
              
              {/* Results Summary */}
              <div className="mt-8 text-center text-sm text-gray-600">
                Showing {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
