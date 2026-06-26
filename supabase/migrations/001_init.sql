-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Activities Table
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    price INTEGER,
    price_label TEXT NOT NULL,
    duration TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    order_rank INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Excursions Table
CREATE TABLE public.excursions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    price INTEGER,
    price_label TEXT NOT NULL,
    duration TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    order_rank INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transport Routes Table
CREATE TABLE public.transport_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('airport_transfer', 'one_way', 'round_trip', 'point_to_point')),
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    price INTEGER,
    price_label TEXT NOT NULL,
    duration TEXT NOT NULL,
    notes TEXT,
    order_rank INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    source TEXT NOT NULL, -- 'google', 'tripadvisor', 'site'
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    activity_ref TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security: Enable RLS
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public Read Access Policies
CREATE POLICY "Allow public read-only access to activities" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to excursions" ON public.excursions FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to transport" ON public.transport_routes FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to approved reviews" ON public.reviews FOR SELECT USING (approved = true);

-- Public Insert Access Policies
CREATE POLICY "Allow public to insert reviews (requires approval later)" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public to insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Functions & Triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_activities_modtime BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_excursions_modtime BEFORE UPDATE ON public.excursions FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_transport_modtime BEFORE UPDATE ON public.transport_routes FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
