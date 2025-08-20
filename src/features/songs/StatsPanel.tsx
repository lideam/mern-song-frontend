import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchStats } from "./SongSlice";
import styled from "@emotion/styled";
import { space, layout, color, typography, flexbox } from "styled-system";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//  Styled Components
const PageWrapper = styled("div")(
  {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  space,
  layout
);

const Panel = styled("div")(
  {
    backgroundColor: "#181818",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "900px",
    width: "100%",
    color: "white",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
  },
  space,
  layout
);

const Title = styled("h2")(
  {
    textAlign: "center",
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: "30px",
  },
  typography
);

const FlexWrap = styled("div")(
  {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px",
  },
  flexbox,
  space
);

const StatCard = styled("div")(
  {
    backgroundColor: "#222",
    borderRadius: "16px",
    textAlign: "center",
    flex: "1 1 200px",
    padding: "20px",
  },
  layout,
  space
);

const StatValue = styled("div")({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#1DB954",
  fontFamily: "'Orbitron', sans-serif",
});

const StatLabel = styled("div")({
  marginTop: "8px",
  textTransform: "uppercase",
  fontFamily: "'Rajdhani', sans-serif",
  letterSpacing: "1px",
  fontSize: "14px",
  opacity: 0.9,
});

// Component
const StatsPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <PageWrapper py={5} px={3}>
      <Panel>
        <Title>📊 Music Stats</Title>

        {loading && <p style={{ textAlign: "center" }}>Loading stats...</p>}
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

        {stats && (
          <>
            <FlexWrap>
              {[
                { label: "Songs", value: stats.totalSongs },
                { label: "Artists", value: stats.totalArtists },
                { label: "Albums", value: stats.totalAlbums },
                { label: "Genres", value: stats.totalGenres },
              ].map((item) => (
                <StatCard key={item.label}>
                  <StatValue>{item.value}</StatValue>
                  <StatLabel>{item.label}</StatLabel>
                </StatCard>
              ))}
            </FlexWrap>

            <FlexWrap mt={4}>
              <StatCard>
                <div style={{ opacity: 0.7 }}>🎶 Top Genre</div>
                <StatValue style={{ fontSize: "1.5rem" }}>
                  {stats.topGenre || "N/A"}
                </StatValue>
              </StatCard>

              <StatCard>
                <div style={{ opacity: 0.7 }}>👤 Top Artist</div>
                <StatValue style={{ fontSize: "1.5rem" }}>
                  {stats.topArtist || "N/A"}
                </StatValue>
              </StatCard>

              <StatCard>
                <div style={{ opacity: 0.7 }}>📈 Avg Songs per Artist</div>
                <StatValue style={{ fontSize: "1.5rem" }}>
                  {stats.avgSongsPerArtist || "0"}
                </StatValue>
              </StatCard>
            </FlexWrap>

            <div style={{ height: 300, marginTop: "40px" }}>
              <h3
                style={{
                  textAlign: "center",
                  fontFamily: "'Rajdhani', sans-serif",
                  marginBottom: "12px",
                }}
              >
                Songs by Genre
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.songsByGenre}>
                  <XAxis dataKey="_id" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1DB954" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </Panel>
    </PageWrapper>
  );
};

export default StatsPanel;
